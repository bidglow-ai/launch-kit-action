# BidGlow Launch Kit

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

Use https://bidglow.ai/launch-kit for an editable PNG card and translated templates.
Website copy stays in its original language. Use your own AI to review/translate it.
Free publication is a separate explicitly approved flow; every paid bid needs
human-confirmed payment. No traffic, search rank or AI recommendation is guaranteed.

Support: admin@bidglow.ai. Maintainer: Blessbridge Global Trading LLC.
