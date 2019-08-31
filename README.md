# investments-calculator: a coding challenge
nathan kipp | [nskipp@gmail.com](mailto:nskipp@gmail.com)

---

### The challenge I was given was as follows
* Write a program that takes in three (3) types of string commands from stdin
  1. INITIAL PRICE [TICKER] $[PRICE]
  2. [INVESTOR] [BUY|SELL] [NUMBER] [TICKER]
  3. [TICKER] [UP|DOWN] [$VALUE|PERCENT%]
* On EOF, output (to stdout) an alpha-ordered summary of investment results
  * eg: [INVESTOR] SPENT $[DOLLARS_OUT] AND ENDED WITH [ENDING_VALUE], A [PERCENT]% RETURN

#### For the purpose of this challenge I was allows to assume that:
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
