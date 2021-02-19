## SETUP

1. You will need node installed
2. run npm install

## EXECUTION

1. `npm start` to run the program with no params (default id)
2. `npx ts-node src/index.ts --id=<ID> --mode=<MODE>` to run for a given ID/MODE
3. `npm test` to run the tests

### NOTES

1. Ran out of time, there was no time to implement the 2nd stage ("next step") in the program although given the way the company dictionary is built I don't see this being as complex as part A (if I understand the requirements properly).
2. Would of like to have built in more fail-safe / data-structure checks, and potentially more tests had time allowed.

## THOUGHTS & BONUS CONSIDERATIONS

I found this actually quite an interesting problem to solve. At first glance the recursive tree looks simple, but then the way the tree needs to print/render makes this more tricky.

The performance impact given my implemented solution would suffer to some extent given larger amounts of data. The most noticable area that needs improvement is the `countCompanyLandIds` function.
Currently this recurses the entire tree down for a given id to count the land parcels, and does this on every node. To improve this nodes, some way of storing calculations and using them for parents as you go up the tree would help optimise this (so you dont visit the same nodes twice); or even better would be to calculate and store this in some way at the dictionary construction stage.

In the real world, I suspect the SQL for this could get fairly complex (possibly using CTEs with recursion? I don't know) to get only needed data.

Another thought might be to do some of these calculations as up-front tasks when updating data for often-used information (ie have batch jobs that run), and then call upon these when needed instead of on every request (an example would be for the amount of LandIds for each company). This would depend on the use-case though -- ie: how often does this data change? How often is it requested? Does demographics come into play (as mentioned in the spec)? - because then this info would need to be stored on a finer level of detail.

Complications like ownership percentage and demographic drill-downs only lead towards these "all-calculated" recursive solutions becoming more complex, pushing the need to potentially store some of these calculations (particularly the land-count per company / in a region / based on percentage) up front and redo them as data changes.
