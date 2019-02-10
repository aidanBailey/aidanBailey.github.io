$(document).ready(function(){
    let CalculatorStateEnum = Object.freeze({
        "clear": 1,
        "answer": 2, 
        "input": 3,
        "operation": 4,
        "error": 5});
    let calculatorState = CalculatorStateEnum.clear;

    function isOperator(myChar){
        if(myChar === '÷' || myChar === '×' || myChar === '+' || myChar === '-')
            return true;
        else
            return false;
    }

    $(".btn-input").click(function(){
        if(calculatorState === CalculatorStateEnum.clear)
            $("#expressionText").text("");
        
        if(calculatorState === CalculatorStateEnum.error)
        {
            $("#expressionText").text("");
            $("#answerText").text("");
        }
            
        if(calculatorState === CalculatorStateEnum.answer){
            $("#answerText").text("Answer = " + $("#expressionText").text());
            $("#expressionText").text("");
        }

        let comExpression = $("#expressionText").text() + $(this).html();
        $("#expressionText").text(comExpression);
        calculatorState = CalculatorStateEnum.input;
    });

    $("#clearButton").click(function(){
        if(calculatorState === CalculatorStateEnum.clear)
            return;
        
        if(calculatorState === CalculatorStateEnum.answer || calculatorState === CalculatorStateEnum.error){
            $("#expressionText").text("0");
            calculatorState = CalculatorStateEnum.clear;
            return;
        }

        let currExpression = $("#expressionText").text();
        let slicedExpression = (currExpression.length > 1) ? currExpression.slice(0, -1) : "0";
        $("#expressionText").text(slicedExpression);
        
        if(currExpression.length <= 1){
            calculatorState = CalculatorStateEnum.clear;
            return;
        }
            
        if(isOperator(slicedExpression[slicedExpression.length - 1]))
            calculatorState = CalculatorStateEnum.operation;
        else 
            calculatorState = CalculatorStateEnum.input;
    });

    $(".btn-operation").click(function(){
        if(calculatorState === CalculatorStateEnum.operation || calculatorState === CalculatorStateEnum.error)
            return;

        let operator = $(this).text();

        if(operator === '÷') operator = '/';
        if(operator === '×') operator = '*';
        
        let comExpression = $("#expressionText").text() + operator;
        $("#expressionText").text(comExpression);
        calculatorState = CalculatorStateEnum.operation;
    })

    $("#resultButton").click(function(){
        if(calculatorState === CalculatorStateEnum.clear)
            return;
        
        try{
            let expression = $("#expressionText").text()
            let answer = eval(expression);
            $("#answerText").text(expression + "=")
            $("#expressionText").text(answer);
            calculatorState = CalculatorStateEnum.answer;
        }
        catch(err){
            $("#expressionText").text("Error!");
            calculatorState = CalculatorStateEnum.error;
        }
    })
});