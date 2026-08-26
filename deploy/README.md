# Deploying invest-reg-d.nemilmm.com

Server-side jurisdiction enforcement for the Regulation D 506(c) offering page.

The app already ships a client-side `GeoGate`, but a static export sends the
whole page and lets JavaScript hide it afterwards — anyone can read the offering
by viewing source or disabling JS. The nginx gate below refuses the request at
the edge, so non-US visitors never receive the content.

Target: nginx on the existing Ubuntu EC2 host that already serves nemilmm.com.

---

## 1. Install the GeoIP2 module and the database

```bash
sudo apt update
sudo apt install libnginx-mod-http-geoip2 geoipupdate
```

MaxMind's GeoLite2 is free but needs an account. Sign up at
<https://www.maxmind.com/en/geolite2/signup>, create a licence key, then:

```bash
sudo nano /etc/GeoIP.conf
```

```
AccountID       YOUR_ACCOUNT_ID
LicenseKey      YOUR_LICENSE_KEY
EditionIDs      GeoLite2-Country
```

```bash
sudo geoipupdate
ls -l /usr/share/GeoIP/GeoLite2-Country.mmdb   # confirm it exists
```

`geoipupdate` installs a systemd timer that refreshes the database weekly.
Confirm with `systemctl list-timers | grep geoipupdate`. Keeping it current
matters — a stale database misclassifies reassigned IP ranges.

## 2. Install the config

```bash
sudo cp deploy/nginx/geoip2.conf /etc/nginx/conf.d/geoip2.conf
sudo cp deploy/nginx/invest-reg-d.nemilmm.com.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/invest-reg-d.nemilmm.com.conf \
           /etc/nginx/sites-enabled/
```

## 3. Certificate

The vhost references a Let's Encrypt certificate that does not exist yet.
Issue it before enabling the site, or nginx will fail to start:

```bash
sudo certbot --nginx -d invest-reg-d.nemilmm.com
```

DNS already points invest-reg-d.nemilmm.com at this host, so the HTTP-01
challenge will pass.

## 4. Publish the build

```bash
npm run build                      # produces ./out
sudo mkdir -p /var/www/invest-reg-d
sudo rsync -a --delete out/ /var/www/invest-reg-d/
sudo chown -R www-data:www-data /var/www/invest-reg-d
```

## 5. Test, then reload

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Verifying the gate

From a non-US address (this office is in India, so a plain curl works):

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://invest-reg-d.nemilmm.com/
# expect 404
curl -s https://invest-reg-d.nemilmm.com/ | grep -c "Regulation D"
# expect 0 — the offering must not be in the response body at all
```

From a US address, via any US VPN exit or a US-based checker, expect `200` and
the offering page.

Both checks matter. A 404 status with the offering still in the body would mean
the gate is not actually withholding content.

---

## Fail-closed, deliberately

`geoip2.conf` maps *any* country other than `US` to blocked, including an
unknown or unresolvable IP. This is the opposite of the in-app `GeoGate`, which
fails open so a slow lookup never locks out a legitimate investor.

The tradeoff: a small number of genuine US visitors on unusual networks will be
refused. They can still reach invest@nemilmm.com, which the 404 page shows.
If that proves too aggressive, change the `default` in the `map` block to `0`,
understanding that it weakens the control.

## What this does not solve

- **VPNs and proxies.** A non-US person on a US exit node passes the IP check.
  The address gate at the investment step is what actually stops them.
- **Reg S.** invest-intl (nemilmm-intl) has its own gate, currently disabled.
  Arm it separately if the offshore page needs the mirror-image restriction.
- **Datacentre IPs.** GeoLite2 resolves these less reliably than residential
  ranges. If false blocks become a problem, MaxMind's paid GeoIP2 Country feed
  is more accurate than the free GeoLite2.

## Alternative: Cloudflare in front

If maintaining the MaxMind database is unwelcome, moving nemilmm.com's DNS to
Cloudflare gives country data with no server-side dependency, via a WAF custom
rule (`ip.src.country ne "US"`) or a Worker returning the 404. It blocks before
the request reaches this origin at all. That replaces steps 1–2; the vhost stays
otherwise the same, minus the `if ($reg_d_blocked)` lines.
