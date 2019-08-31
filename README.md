# investments-calculator: a coding kata

### The kata asks you to:
__Write a program that takes in three (3) types of string commands from `STDIN`__

  1. ```INITIAL PRICE [TICKER] $[PRICE]```  
  2. ```[INVESTOR] [BUY|SELL] [NUMBER] [TICKER]```  
  3. ```[TICKER] [UP|DOWN] [$VALUE|PERCENT%]```  

__On EOF output (to `STDOUT`) a list, ordered by investor name, of portfolio returns__  

```[INVESTOR] SPENT $[DOLLARS_OUT] AND ENDED WITH $[ENDING_VALUE], A [PERCENT]% RETURN```

#### For the purpose of this kata you can assume that:
  1. Only well-formatted commands will be entered
  2. Initial price commands always come first, and never again
  3. Commands can be considered to appear in chronological order

---

## This is my solution

#### Running the code requires node js & npm (or yarn)

## Setup
1. Clone this repo & ```$ cd ./investments-calculator``` into the new dir
2. Run ```$ npm install``` or ```$ yarn``` to install dependencies
3. Follow instructions below to run the script

## Example executions
__To manually enter commands__  
```$ node ./index.js```  
```$ [your commands here...]```  
```[CTRL-C] // sends EOF and triggers final output```  

__To send in a list of commands__  
```$ node ./index.js < ./path/to/file```  
(Note: like manual entry, this method will list file lines above the final output)
