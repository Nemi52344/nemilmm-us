# Deploying invest-reg-d.nemilmm.com

Static hosting for the Regulation D 506(c) offering page on the existing
Ubuntu/nginx EC2 host that already serves nemilmm.com.

DNS is already in place: `invest-reg-d.nemilmm.com` resolves to that host.

---

## 1. Certificate

Issue it before enabling the site, or nginx will refuse to start on a missing
cert path:

```bash
sudo certbot --nginx -d invest-reg-d.nemilmm.com
```

DNS already points at this host, so the HTTP-01 challenge will pass.

## 2. Build and publish

On your machine:

```bash
npm run build          # produces ./out
```

Copy `out/` to the server, then:

```bash
sudo mkdir -p /var/www/invest-reg-d
sudo rsync -a --delete out/ /var/www/invest-reg-d/
sudo chown -R www-data:www-data /var/www/invest-reg-d
```

`--delete` removes files that are no longer in the build, so stale assets do
not linger between deploys.

## 3. Install the vhost

```bash
sudo cp deploy/nginx/invest-reg-d.nemilmm.com.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/invest-reg-d.nemilmm.com.conf \
           /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 4. Check

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://invest-reg-d.nemilmm.com/   # 200
```

To redeploy after a change, repeat step 2 only. No nginx reload needed.

---

## How the jurisdiction restriction works

`components/GeoGate.tsx` runs in the visitor's browser. It looks up the
country from get.geojs.io, falling back to ipapi.co, and shows the site's 404
screen instead of the offering when the result is not the US or a US territory.

Be clear about what that is and is not:

- **The offering HTML is still delivered to every visitor.** This is a static
  export, so the page arrives complete and JavaScript hides it afterwards.
  Viewing source, or simply disabling JavaScript, reveals the full terms.
- **It fails open.** If both lookups fail, or neither answers within 3.5
  seconds, the visitor is allowed through. That is deliberate, so a flaky
  network never locks out a legitimate US investor.
- **A VPN defeats it.** Any non-US person on a US exit node passes.

The control that actually holds is the address gate at the investment step:
an investor entering a non-US address is stopped there, and that check does
not depend on IP at all.

If the page ever needs a block that never delivers the content, that requires
server-side enforcement — either nginx with a GeoIP2 database, or Cloudflare
in front supplying a country header. Both were prototyped and removed in
commit `bcad6d2`; recover them from git history rather than rewriting.
