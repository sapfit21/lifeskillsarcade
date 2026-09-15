# Handout 02.19: Paper Ledger

Name: ______________________ Period: ______ Merchant number: ______ Start date: __________

This is the no-device version of ClassroomStreet. The teacher is the market. Every class day the teacher reads the dispatch and posts the seven prices on the board. You update your ledger, make your trades on paper, and total your fortune. Your ledger is your proof; the Investor Report is written from it.

**The rules.**
- You start with AQ25,000 cash and no units.
- Whole units only. Cash may never go below zero.
- A buy: cash goes down by units times price. Units go up.
- A sell: cash goes up by units times price. Units go down. You cannot sell units you do not hold.
- Every trade goes in the trade log, in order, the moment you make it.
- At the end of every day, fill in the daily fortune table: cash, plus the value of every venture you hold (units times today's price), equals total fortune.
- The teacher initials the day's total.

## Section A: Trade log

| # | Day | Ticker | Buy or sell | Units | Price (from the board) | Units x price = AQ | Cash after this trade |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |
| 11 | | | | | | | |
| 12 | | | | | | | |
| 13 | | | | | | | |
| 14 | | | | | | | |
| 15 | | | | | | | |
| 16 | | | | | | | |
| 17 | | | | | | | |
| 18 | | | | | | | |
| 19 | | | | | | | |
| 20 | | | | | | | |

(Ask for a second sheet if you fill this one.)

## Section B: Units I hold at the end of each day

Copy the number forward every day, even if it did not change.

| Ticker | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 | Day 6 | Day 7 | Day 8 | Day 9 (close) | R2 Day 1 | R2 Day 2 | R2 Day 3 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SPRK | | | | | | | | | | | | |
| CLDB | | | | | | | | | | | | |
| IRON | | | | | | | | | | | | |
| SEAL | | | | | | | | | | | | |
| WLLW | | | | | | | | | | | | |
| HNYP | | | | | | | | | | | | |
| MDOW | | | | | | | | | | | | |

## Section C: Daily fortune

Value of a venture = units held times today's board price. Total fortune = cash + all seven values.

| Day | Cash | SPRK value | CLDB value | IRON value | SEAL value | WLLW value | HNYP value | MDOW value | Total fortune | Teacher initials |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | |
| 2 | | | | | | | | | | |
| 3 | | | | | | | | | | |
| 4 | | | | | | | | | | |
| 5 | | | | | | | | | | |
| 6 (crisis) | | | | | | | | | | |
| 7 (crisis) | | | | | | | | | | |
| 8 (recovery) | | | | | | | | | | |
| 9 (close) | | | | | | | | | | |
| R2 Day 1 | | | | | | | | | | |
| R2 Day 2 | | | | | | | | | | |
| R2 Day 3 | | | | | | | | | | |

My closing total fortune (Day 9): AQ __________ My percent return: (__________ minus 25,000) divided by 25,000, times 100 = ______ percent

My Round 2 closing fortune: AQ __________

* * *

## Teacher key: the price table and the dispatch script

Do not hand this page to students. Post the day's prices on the board at the start of the trading window and read the dispatch aloud twice, once fast and once slow. The prices below are an example path built from the Fortune Street starting prices in Sal's README; they match the example numbers in `Handout 02.18 - Return Math.md`, so the safe, risky, and mixed portfolios there can be checked against this table. [Sal: if you want the paper path to match the live site's, copy the live closing prices for each class day into this table instead.]

### The price table (AQ per unit)

| Day | Lesson | SPRK | CLDB | IRON | SEAL | WLLW | HNYP | MDOW |
|---|---|---|---|---|---|---|---|---|
| 1 | 2.14 D1 | 48.50 | 32.75 | 100.00 | 98.50 | 55.00 | 100.00 | 72.00 |
| 2 | 2.14 D2 | 51.00 | 35.20 | 100.10 | 98.60 | 55.30 | 100.05 | 72.80 |
| 3 | 2.15 D1 | 47.30 | 38.90 | 100.20 | 98.70 | 55.60 | 100.10 | 71.50 |
| 4 | 2.15 D2 | 54.10 | 36.40 | 100.30 | 98.80 | 55.90 | 100.15 | 73.60 |
| 5 | 2.16 | 57.80 | 41.00 | 100.40 | 98.90 | 56.20 | 100.20 | 74.20 |
| 6 (crisis) | 2.17 D1 | 40.50 | 27.90 | 99.60 | 99.00 | 54.80 | 100.25 | 68.50 |
| 7 (crisis) | 2.17 D2 | 31.20 | 20.10 | 99.20 | 99.20 | 53.90 | 100.30 | 64.00 |
| 8 (recovery) | 2.18 | 36.90 | 24.30 | 99.70 | 99.30 | 55.10 | 100.35 | 67.10 |
| 9 (close) | 2.19 D1 | 36.90 | 24.30 | 99.70 | 99.30 | 55.10 | 100.35 | 67.10 |
| R2 Day 1 | 2.20 | 41.60 | 27.50 | 100.20 | 99.40 | 56.50 | 100.40 | 70.30 |
| R2 Day 2 | 2.21 | 45.20 | 31.80 | 100.40 | 99.50 | 56.90 | 100.45 | 71.80 |
| R2 Day 3 | 2.22 | 43.70 | 34.60 | 100.50 | 99.60 | 57.20 | 100.50 | 73.00 |

Day 9 is the closing bell: no trades; the prices are the Day 8 close. The peak for the risky ventures is Day 5; the bottom is Day 7.

Percent moves across the crisis (Day 5 to Day 7): SPRK minus 46.0 percent; CLDB minus 51.0 percent; MDOW minus 13.7 percent; WLLW minus 4.1 percent; IRON minus 1.2 percent; SEAL plus 0.3 percent; HNYP plus 0.1 percent.

### The dispatch script

**Day 1 (Lesson 2.14 Day 1).** "Merchants, welcome to Fortune Street. The Golden Land's seven ventures open for trading today at the prices on the board. The Crown wishes you a fair season. No news yet; the street is quiet."

**Day 2 (Lesson 2.14 Day 2).** "The spring trade season opens. Crews at Sparkstone report good weather in the mountains, and Cloudberry's balloons lift off on schedule. Planting begins across Meadowgold's farms. Buyers are cheerful; most prices edge up. The Honeypot pays its usual small amount."

**Day 3 (Lesson 2.15 Day 1).** Two dispatches. "A shaft floods at Sparkstone's north mine. No one is hurt, but output will be down for a month while the pumps run." And: "Cloudberry's second expedition sights islands nobody has mapped. Meanwhile, a week of rain delays planting on Meadowgold's eastern farms."

**Day 4 (Lesson 2.15 Day 2).** Three dispatches. "Sparkstone's pumps clear the flooded shaft, and the crews strike a new seam of crystal on the way down." "Cloudberry's islands turn out to be bare rock; the expedition returns with nothing." "Meadowgold signs a rent deal with the Crown's granary for the next three seasons." Optional hype dispatch, read in a different voice: "From an unnamed source: Sparkstone will DOUBLE by next week. Get in NOW before everyone else does." (Tell students afterward that the last one was written by you and ask which tests it failed.)

**Day 5 (Lesson 2.16).** "Trade fair week on Fortune Street. Buyers from every province fill the market. Cloudberry announces a fourth voyage. Prices sit at season highs. The Crown's treasury reports a strong year and Crown Seal Notes will pay their usual 2 percent." (Say nothing about tomorrow.)

**Day 6 (Lesson 2.17 Day 1), the crisis.** "Dispatch from the harbor. A fleet of forty trading ships from the eastern sea has sunk in a storm, and with it the cargo that half the merchants on this street had borrowed against. The lenders are calling in their loans this morning. Merchants are selling whatever they can to pay. Sparkstone and Cloudberry are falling hardest. Meadowgold is down. The Crown's notes, the Iron Vault, and the Honeypot are holding." (Post the prices after the second reading.)

**Day 7 (Lesson 2.17 Day 2).** Two dispatches. "The shipyard that built the fleet has closed its gates. Two trading houses have failed overnight. The selling continues; Sparkstone and Cloudberry fall again." And, at the end of the trading window: "The Crown announces it will lend to any sound merchant at low cost until the street steadies. Some buyers say the worst may be near."

**Day 8 (Lesson 2.18), recovery.** "The Crown's loans have steadied the street. Sparkstone reopens two shafts; Cloudberry secures coin for its fourth voyage after all. Buyers return, slowly. Prices are up from yesterday but well below the trade fair highs. The Honeypot pays as always."

**Day 9 (Lesson 2.19 Day 1), the closing bell.** "The market is closed for the reveal. No trades today. Total your fortune at yesterday's prices and bring it to the board."

**Round 2, Day 1 (Lesson 2.20).** "Fortune Street reopens. You now know what every venture really is. Sparkstone reports strong output from the new seam. Cloudberry's fourth voyage launches. The recovery continues."

**Round 2, Day 2 (Lesson 2.21).** "Cloudberry's voyage sends back word of a real find: a harbor on an unmapped coast. Sparkstone rises with the general recovery. Meadowgold's rents climb as the granary deal begins."

**Round 2, Day 3 (Lesson 2.22).** "A dry spell worries Sparkstone's water supply and the price slips. Cloudberry confirms its find. Meadowgold's rents climb again. The Crown's notes pay on schedule. Round 2 closes at the bell."

### Checking a ledger

Spot check one student per day: pick a trade in Section A and confirm units times price equals the cash change; then confirm Section C's total for that day equals cash plus units times the board price for each venture. A ledger that does not add is corrected by the student with the teacher watching, not by the teacher.

Worked check, Day 1: a student buys 200 SPRK at 48.50 (9,700), 100 SEAL at 98.50 (9,850), 50 HNYP at 100.00 (5,000). Cash after: 25,000 minus 9,700 minus 9,850 minus 5,000 = 450. Day 1 total fortune: 450 + 9,700 + 9,850 + 5,000 = 25,000. Day 2 total, same holdings: 450 + 200 x 51.00 (10,200) + 100 x 98.60 (9,860) + 50 x 100.05 (5,002.50) = 25,512.50.
