//Do all the required Functions first.

//#1. Function to Reverse a String:

function reverseString(str)
{
    var splitString= str.split('');
    var reversedString = splitString.reverse();
    var reverseJoinedString = reversedString.join('');
    return reverseJoinedString;
}

//#2. Function to check if the String is Palindrome:

function isItPalindrome(str)
{
    var reverseStr = reverseString(str);
    return str === reverseStr;
}

//#3. Function to convert date from number to string:

function convertDateToString(date)
{
    var dateString = {
        day: '',
        month: '',
        year: '',
    };
    //day
    if(date.day < 10){
        dateString.day = '0' + date.day; //Automatically converted to string because adding number adding with string.
    }
    else{
        dateString.day = date.day.toString();
    }
    //month
    if(date.month < 10){
        dateString.month = '0' + date.month;
    }
    else{
        dateString.month = dateString.month.toString();
    }
    //year
    dateString.year = date.year.toString();
    return dateString;
}

//#4. Function to get all date Formats, i.e. ddmmyy, mmddyy etc.

function getAllDateFormats(date)
{
    var dateString = convertDateToString(date);

    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy   = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy   = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd   = dateString.year.slice(-2) + dateString.month + dateString.day;

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

//#5. Check if Palindrome or not for all the date formats.

function checkPalindromeForAllDateFormats(date)
{
    var listOfPalindromes = getAllDateFormats(date);
    var isPalindromeCheck = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if(isItPalindrome(listOfPalindromes[i]))
        {
            isPalindromeCheck = true;
            break;
        }
    }
    return isPalindromeCheck;
}

// Supportive Function: to check if it is Leap Year:

function isItLeapYear(year)
{
    if(year % 400 === 0)
    {return true;}
    if(year % 100 === 0)
    {return false;}
    if(year % 4 === 0)
    {return true;}
    return false;
}

// Supportive Function: to get the Next Date:

function getNextDate(date)
{
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    //check for february now:-
    if (month === 2)
    {
        if(isItLeapYear(year))
        {
            if(day > 29)
            {
                day = 1;
                month = month + 1;
            }
        }
        else{
            if(day > 28)
            {
                day = 1;
                month = month + 1;
            }    
        }
    }
    //check for other months:-
    else
    {
        if(day > daysInMonth[month - 1])
        {
            day = 1;
            month = month + 1;
        }
    }
    //check for year
    if (month > 12)
    {
        month = 1;
        year = year + 1;
    }

    return{
        day: day,
        month: month,
        year: year,
    };
}

//#6. Function to get the Next Palindrome Date

function getNextPalindromeDate(date)
{
    var counter = 0;
    var nextDate = getNextDate(date);

    while(true)
    {
        counter = counter + 1;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome)
        {break;}
        nextDate = getNextDate(nextDate);
    }
    return [counter,nextDate];
}

//---------------------Wiring Part----------------------------------

const dateInputRef = document.querySelector("#date-input");
const checkBtnRef = document.querySelector("#check-btn");
const outputTextRef = document.querySelector("#output-area");

function checkButtonHandler()
{
    var birthDayString = dateInputRef.value;
    if (birthDayString !== '')
    {
        var listOfDate = birthDayString.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0]),
        }
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if (isPalindrome)
        {
            outputTextRef.innerText = "Hooray! Your birthday is Palindrome!!"
        }
        else
        {
            var [counter,nextDate] = getNextPalindromeDate(date);
            outputTextRef.innerText = "Your bday is not Palindrome 😔 Next Palindrome date is " + nextDate.day+"-"
            + nextDate.month +"-"+ nextDate.year + "You missed it by " + counter + "days"
        }    
    }
}

checkBtnRef.addEventListener("click",checkButtonHandler);
