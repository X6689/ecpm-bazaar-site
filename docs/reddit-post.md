# Title

I built a small eCPM comparison dashboard for mobile game developers. Looking for feedback / beta testers.

# Suggested subreddits

- r/gamedev
- r/indiegamedev
- r/androiddev
- r/iOSProgramming
- r/SideProject
- r/SaaS

Check each subreddit rules before posting. For stricter communities, post as a feedback request instead of a promotion.

# Post body

Hi everyone,

I am building a small tool called eCPM Bazaar for developers who monetize mini-games or mobile apps with ads.

The pain point is simple: if you use multiple ad networks or a mediation platform, it is surprisingly annoying to understand why revenue changed.

Every day you may need to check:

- revenue
- eCPM
- impressions
- fill rate
- country breakdowns
- placement breakdowns
- ad source performance

The first version connects to the TopOn reporting API and turns that data into a simple dashboard:

- weighted eCPM and revenue overview
- country / placement / ad source rows
- eCPM trend chart
- alerts for eCPM, revenue, and fill-rate drops
- demo mode and real-data mode

The API integration is working, but my own TopOn test account is new and does not have real monetization records yet. So I am looking for a few developers with real ad data to test whether this is actually useful.

I am looking for 3 beta testers who:

- run a mobile game, mini-game, or app with ads
- have recent ad impressions or revenue data
- use TopOn or another mediation/reporting platform
- want help diagnosing eCPM or fill-rate changes

Security boundary:

- I do not need your account password.
- Read-only reporting access is preferred.
- I will not publish your app name, screenshots, revenue, or raw data.
- You can revoke access after the test.

In return, I can provide a free short diagnosis of:

- where eCPM changed
- whether the change came from eCPM, impressions, or fill rate
- which country / placement / ad source looks suspicious
- what alert rules might be useful for your app

This is not a promise to increase revenue. I am trying to validate whether a clean comparison and alerting workflow is useful for small teams.

If you have experience with ad monetization, I would also love feedback:

What do you check most often: eCPM, fill rate, ad source performance, country breakdowns, or revenue drops?
