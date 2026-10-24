# Considered local automation

Runs on your Windows PC using Docker Desktop. No paid API or cloud n8n subscription is configured. Your PC and Docker must stay on for local jobs. Cloudflare hosting continues independently when they stop.

## Open and start

```powershell
Set-Location -LiteralPath 'E:\Projests\affiliate_marketing\automation'
docker compose up -d
docker compose exec -T ollama ollama pull qwen2.5:1.5b
```

Open http://localhost:5678 and create your local n8n owner account. Choose your own password; it is not stored in this repository. n8n's database and encryption key persist in the `n8n_data` Docker volume. Ollama models persist in `ollama_data`. Never run `docker compose down -v` unless you intend to permanently remove these volumes.

The editor binds only to your machine. HTTP cookies are configured for this local-only HTTP setup. Do not expose port 5678 to the internet or use this configuration on a public server. Ollama and the helper have no published ports. No Git credentials, Docker socket or complete project folder are mounted into the containers.

## Import workflows (first setup only)

After creating your owner account, run these once. Reimporting updates the fixed workflow IDs and can overwrite your workflow edits.

```powershell
docker compose exec -T n8n n8n import:workflow --input=/workflows/content-draft.json
docker compose exec -T n8n n8n import:workflow --input=/workflows/site-health.json
docker compose restart n8n
```

Open **Considered - Local AI draft**. Edit the **Generate review draft** node's JSON body: `topic`, `notes`, and optional HTTPS `sources`. Supply factual notes you checked; a URL alone is not research. Click **Execute workflow**. The helper calls the local model, validates the structure, checks for a duplicate guide slug and saves a file under:

```text
E:\Projests\affiliate_marketing\automation\runtime\drafts\
```

These files stay out of Git and the public website. A small local model is a drafting aid, not a fact checker. The initial workflow does not crawl product pages, collect trends, create Amazon links or copy product photos. It drafts general editorial guides from your brief. Keep source notes and confirm all claims before publication.

## Review, merge and optionally publish

Read the JSON file, edit the `guide` content and check every claim. This command records that you have completed that review. Replace FILE with the real draft filename:

```powershell
Set-Location -LiteralPath 'E:\Projests\affiliate_marketing'
node automation/review-publish.mjs 'automation/runtime/drafts/FILE.json' --reviewed
```

This merges the guide locally and runs build/check. It refuses to overwrite existing guides, and restores content if validation fails. For the alternative that also commits and pushes the reviewed guide, use the following **instead of** the local-only command:

```powershell
node automation/review-publish.mjs 'automation/runtime/drafts/FILE.json' --reviewed --push
```

Git authentication uses your Windows environment, outside the containers. Cloudflare's Git integration deploys the push. The script never stages images, secrets or unrelated files. If you already merged locally, inspect the preview and commit/push `content/guides.json` manually rather than rerunning the same draft.

## Site checks

Open **Considered - Site health** and execute it manually. It checks your live site pages, robots and sitemap and saves `runtime/reports/site-health.json`. It does not follow affiliate links, create artificial Amazon clicks, check stock, or read Search Console/Associates performance data.

The workflow includes a daily 09:00 Asia/Kolkata trigger. During initial setup it was tested and published, so the daily health check is enabled while the PC and Docker run. The JSON template is inactive for safe reimport; after reimport, publish this workflow again in the editor if you want to restore scheduling. The AI drafting workflow remains manual. Reports are local; no email, messaging or social posting is connected.

## Controls and maintenance

```powershell
Set-Location -LiteralPath 'E:\Projests\affiliate_marketing\automation'
docker compose ps
docker compose logs --tail 50 n8n assistant
docker compose stop
docker compose start
```

Docker memory limits: n8n 2 GB, helper 256 MB, Ollama 6 GB. The small model runs one generation at a time and unloads after generation. Initial image and model downloads require internet and several GB of free disk. CPU generation can take several minutes. No model quality or running-cost guarantee is implied; electricity and storage still have costs.

Images are pinned to the downloaded digests when setup completes. To update deliberately, select an official version, replace the relevant image digest and run `docker compose pull` then `docker compose up -d`. Back up n8n's data volume and local drafts before upgrades. Never commit credential exports, encryption keys or `.env` files.

Official documentation:
* https://docs.n8n.io/hosting/installation/docker/
* https://docs.n8n.io/hosting/cli-commands/
* https://docs.ollama.com/api/generate

## Initial verification

Installed n8n 2.44.6. Both workflows were imported and successfully executed. The health report checked 18 live URLs without failures. A sample local-model draft was saved with status needs_review; no guide was automatically published. Images are pinned to exact downloaded digests in compose.yaml. Create your local owner account at http://localhost:5678 if setup is still displayed.
