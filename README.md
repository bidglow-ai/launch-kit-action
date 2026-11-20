# BidGlow Launch Kit — retired integration

**Status: retired.** BidGlow removed the draft/Launch Kit workflow on October 8, 2026. The instructions below describe the historical action, not the current publishing API. Do not install this action for new integrations.

Official website: [BidGlow](https://bidglow.ai/). Current AI publishing and payment contract: [developers](https://bidglow.ai/developers), [capabilities](https://bidglow.ai/api/v1/agent/capabilities), [OpenAPI](https://bidglow.ai/openapi.json).

## Historical action (unsupported)

Prepare a public website introduction in a GitHub workflow. No account, card,
publication or payment. This first-party action calls BidGlow's public metadata
endpoint. The website content is untrusted text; review it before sharing.

Requires Node.js 22+ on a Linux/macOS runner. No dependencies or install scripts.
Pass inputs through the action inputs, never interpolate them into a shell command.
The response becomes the `copy` output; the action does not print the website copy
or publish it to job summaries, issues, social networks or listings.

```yaml
on: workflow_dispatch
permissions: {}
jobs:
  prepare:
    runs-on: ubuntu-latest
    steps:
      - uses: bidglow-ai/launch-kit-action@v1
        id: launch
        with:
          url: https://your-public-website.com
```

For supply-chain protection, pin the action to a reviewed full commit SHA instead
of a moving tag. A release trigger may be used after explicit repository-owner
configuration. This action generates a draft, not a deployment or automatic listing.

Never pass a private URL, password, query string, fragment or management link.
The endpoint is rate-limited and may reject inaccessible or disallowed websites.
It creates only short-lived rate-limit counters, not a stored launch kit. Data is
read from the supplied public website; no model service is used.

The former /launch-kit page and draft workflow are retired; use the current developer documentation linked above.
Website copy stays in its original language. Use your own AI to review/translate it.
Current free publication and optional paid placement are separate workflows. Stripe Checkout requires customer confirmation; authorized external wallets can use the current Base USDC order API. This retired action does neither. No traffic, search rank or AI recommendation is guaranteed.

Support: admin@bidglow.ai. Maintainer: Blessbridge Global Trading LLC.
