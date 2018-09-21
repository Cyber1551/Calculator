/*
    Author: Brandon Lacy
    The script that controls everything
    Date: 9/21/2018
*/
var calculator = document.getElementById("container");
var txt = document.getElementById("txt");
var his = document.getElementById("history");
var clear = document.getElementById("clr");
//Count is equal to the number of characters in the input box (not including .); thus it limits it to 13 so it doesn't go outside the calculator
var count = 1;

//Stored the first valued enter to be calculated later
var firstValue = 0;
//The current operator (*/+-)
var operator = "";
//This is called from every button
function getInput(button)
{
    //If the button doesn't have a dataset then it is a number so add it to the textbox
    if (button.dataset.action == undefined)
    {
        if (count < 13)
        {
            if (txt.innerHTML == '0')
            {
                txt.innerHTML = button.innerHTML;
            }
            else
            {
                txt.innerHTML += button.innerHTML;
            }
            //And increase the count
            count++;
        }
        
    }
    else
    {
        //The button pressed is either an operation or a decimal
        var action = button.dataset.action;
        switch (action)
        {
            case "clear":
            //Clear the screen 
            txt.innerHTML = "0";
            if (his.innerHTML != "")
            {
                //If we have a history clear it.
                //This also mean we have to reset the buttons
                his.innerHTML = "";
                operator = "";
                resetBtns();
               clear.innerHTML = "C";
            }
            //Reset count
            count = 1;
               
            break;
            case "decimal":
                txt.innerHTML += '.';
            break;
            /*
                The operations are pretty much the same other than the operation they do.
                However, they are connected by checking if the current operator exists or not
                If it does than it gets the number that is in the history by splitting and just changing the sign
                This prevents it from resetting the first value to 0
            */
            case "add":
                //Reset all buttons just in case we are changing a sign
                resetBtns();
                //add the is-depressed class to the button to give it a held-down look
                button.classList.add('is-depressed');
                firstValue = txt.innerHTML;
                if (operator == "")
                {
                    
                    his.innerHTML = firstValue + " + "  
                }
                else
                {
                    
                    var fn = his.innerHTML.split(" ")[0] + " + ";
                    his.innerHTML = fn;
                    firstValue = fn;
                }
                count = 1;
                operator = action;
                txt.innerHTML = "0";
                //Change Text to All Clear to clear the history too
                clear.innerHTML = "AC";
            break;
            case "subtract":
                resetBtns();
                button.classList.add('is-depressed');
                firstValue = txt.innerHTML;
                if (operator == "")
                {
                    
                    his.innerHTML = firstValue + " - ";
                }
                else
                {
                    var fn = his.innerHTML.split(" ")[0] + " - ";
                    his.innerHTML = fn;
                    firstValue = fn;
                }
                operator = action;
                count = 1;
                txt.innerHTML = "0";
                clear.innerHTML = "AC";
            break;
            case "multiply":
                resetBtns();
                button.classList.add('is-depressed');
                firstValue = txt.innerHTML;
                if (operator == "")
                {
                    
                    his.innerHTML = firstValue + " * "  
                }
                else
                {
                    
                    var fn = his.innerHTML.split(" ")[0] + " * ";
                    his.innerHTML = fn;
                    firstValue = fn;
                }
                operator = action;
                count = 1;
                txt.innerHTML = "0";
                clear.innerHTML = "AC";
            break;
            case "divide":
                resetBtns();
                button.classList.add('is-depressed');
                firstValue = txt.innerHTML;
                if (operator == "")
                {
                    
                    his.innerHTML = firstValue + " / "  
                }
                else
                {
                    
                    var fn = his.innerHTML.split(" ")[0] + " / ";
                    his.innerHTML = fn;
                    firstValue = fn;
                }
                operator = action;
                txt.innerHTML = "0";
                clear.innerHTML = "AC";
                count = 1;
            break;
            case "equal":
                //Call the calculate class with the current first value and the current number in the textbox
                calculate(firstValue, txt.innerHTML);
            break;
        }
    }
    
}

function calculate(num1, num2)
{
    //This checks if the number is a decimal or not and parses accordingly
    //This is because the values we are getting in are strings so 1 + 1 would be 11
    if (isInt(num1))
    {
        num1 = parseInt(num1);
    }
    else
    {
        num1 = parseFloat(num1);
    }
    if (isInt(num2))
    {
        num2 = parseInt(num2);
    }
    else
    {
        num2 = parseFloat(num2);
    }

    //Switches based on the current operator and performs the right function
    switch(operator)
    {
        case "add":
            txt.innerHTML = add(num1, num2);
        break;
        case "subtract":
            txt.innerHTML = subtract(num1, num2);
        break;
        case "multiply":
            txt.innerHTML = multiply(num1, num2);
        break;
        case "divide":
             txt.innerHTML = divide(num1, num2);
        break;
    }
    /*
    resets everything and sets the count equal to the length of the text so if 20 + 90 = 110 
    the current count is 3 so the input would only allow 10 more characters for a total of 13
    */
    his.innerHTML = "";
    operator = "";
    resetBtns();
    count = txt.innerHTML.length;
    clear.innerHTML = "C";
}
//Preforms magic and adds two numbers together 
function add(num1, num2)
{
    return num1 + num2; 
}
//Subtracts two numbers
function subtract(num1, num2)
{
    return num1 - num2; 
}
//mulitply two numbers
function multiply(num1, num2)
{
    return num1 * num2; 
}
//Checks for divide by 0 and then divides two numbers
function divide(num1, num2)
{
    if (num2 == 0 || num2 == 0.0)
    {
        return "Divide by zero!";
    }
    else
    {
        return num1 / num2; 
    }
    
}
// Loops through all buttons and removes is-depressed class from them
function resetBtns()
{
    
    var btns = document.getElementsByTagName('button');
    for(var i = 0; i < btns.length; i++)
    {
         btns[i].classList.remove('is-depressed');
    }
   
}
//Check if number is an integer or decimal
function isInt(n)
{
    return n%1 === 0;
}