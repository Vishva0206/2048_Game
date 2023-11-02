let grid = document.querySelector(".grid");
const start = document.getElementById("start");
const container = document.querySelector(".container");
const cover = document.querySelector(".cover");
const result = document.getElementById("result");
const over = document.getElementById("over");
let matrix, 
score,
isSwiped,
touchX,
intialX=0,
touchY,
intialY=0,
row= 4,
col= 4,
swipeDirection;
let rectLeft = grid.getBoundingClientRect().left;
let rectTop = grid.getBoundingClientRect().top;

const getXY = (val) =>{
touchX = val.touches[0].pageX-rectLeft;
touchY= val.touches[0].pageY-rectTop;
};

const createGrid = ()=> {
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++)
        {
            const box = document.createElement("div");
            box.classList.add("box");
            box.setAttribute("data-position",`${i}_${j}`);
            grid.appendChild(box);
        }
    }
};

const adjcheck = (arr)=>{
    for(let i=0;i<arr.length-1;i++){
        if(arr[i]==arr[i+1]){
            return true;
        }
    }
    return false;
};

const possible=()=>{
    for(let i in matrix){
        if(adjcheck(matrix[i])){
            return true;
        }
        let colar = [];
        for(let j=0;j<col;j++){
            colar.push(matrix[i][j]);
        }
        if(adjcheck(colar)){
            return true;
        }
    }
    return false;
};

const randomPosition = (arr) =>{
    return Math.floor(Math.random()*arr.length);
};

const empty = () =>{
    for(let r in matrix){
        for(let c in matrix[r]){
                if(matrix[r][c] == 0){
                    return true;
                }
        }
    }
    return false;
};

const gameOver = () =>{
    if(!possible()){
        cover.classList.remove("hide");
        container.classList.add("hide");
        over.classList.remove("hide");
        result.innerText = `Final Score: ${score}`;
        start.innerText="Restart Game";
    }
}; 

const generateTwo = () => {
    if (empty()) {
      let randomRow = randomPosition(matrix);
      let randomCol = randomPosition(matrix[randomPosition(matrix)]);
      if (matrix[randomRow][randomCol] == 0) 
      {
        matrix[randomRow][randomCol] = 2;
        let element = document.querySelector(`[data-position = '${randomRow}_${randomCol}']`);
        console.log(element);
        element.innerHTML = 2;
        element.classList.add("box-2");
      } else {
        generateTwo();
      }
    } else {
      gameOver();
    }
};

const generateFour =()=>{
    if(empty()){
        let randomRow = randomPosition(matrix);
        let randomCol = randomPosition(matrix[randomPosition(matrix)]);
        if(matrix[randomRow][randomCol] == 0)
        {
            matrix[randomRow][randomCol] = 4;
            let element = document.querySelector(`[data-position = '${randomRow}_${randomCol}']`);
            element.innerHTML = 4;
            element.classList.add("box-4");
        }else{
            generateFour();
        }
    }else{
        gameOver();
    }
};

const removeZero = (arr)=>arr.filter((num) => num);
const checker = (arr,reverseArr = false)=>{
    arr = reverseArr ? removeZero(arr).reverse() : removeZero(arr);
    for(let i=0;i<arr.length-1;i++){
        if(arr[i] == arr[i+1]){
            arr[i]+=arr[i+1];
            arr[i+1] = 0;
            score += arr[i];
        }
    }
    arr = reverseArr ? removeZero(arr).reverse() : removeZero(arr);
    let missingCount = 4-arr.length;
    while(missingCount>0){
        if(reverseArr){
            arr.unshift(0);
        }
        else{
            arr.push(0);
        }
        missingCount -= 1;
    }
    return arr;
};

const SlideDown = () =>{
    for(let i=0;i<col;i++){
        let num=[];
        for(let j=0;j<row;j++){
            num.push(matrix[j][i]);
        }
        num = checker(num,true);
        for(let j=0;j<row;j++){
            matrix[j][i] = num[j];
            let element = document.querySelector(`[data-position = '${j}_${i}']`);
            element.innerHTML = matrix[j][i] ? matrix[j][i]: "";
            element.classList.value = "";
            element.classList.add("box",`box-${matrix[j][i]}`);
        }
    }
    let decision = Math.random() > 0.5 ? 1 : 0;
    if(decision){
        setTimeout(generateFour,200);
    }else{
        setTimeout(generateTwo,200);
    }
};

const slideUp = () =>{
    for(let i=0;i<col;i++)
    {
        let num =[];
        for(let j=0;j<row;j++)
        {
            num.push(matrix[j][i]);
        }
        num = checker(num);
        for(let j=0;j<row;j++)
        {
            matrix[j][i] = num[j];
            let element = document.querySelector(`[data-position = '${j}_${i}']`);
            element.innerHTML = matrix[j][i] ? matrix[j][i] : "";
            element.classList.value = "";
            element.classList.add("box",`box-${matrix[j][i]}`);
        }
    }
    let decision = Math.random() > 0.5 ? 1 : 0;
    if(decision){
        setTimeout(generateFour,200);
    }else{
        setTimeout(generateTwo,200);
    }
};

const slideRight = () =>{
    for(let i=0;i<row;i++)
    {
        let num = [];
        for(let j=0;j<col;j++)
        {
            num.push(matrix[i][j]);
        }
        num = checker(num,true);
        for(let j=0;j<col;j++){
            matrix[i][j] = num [j];
            let element = document.querySelector(`[data-position = '${i}_${j}']`);
            element.innerHTML = matrix[i][j] ? matrix[i][j] : "";
            element.classList.value = "";
            element.classList.add("box",`box-${matrix[i][j]}`);
        }
    }
    let decision = Math.random() > 0.5 ? 1 : 0; 
    if(decision)
    {
        setTimeout(generateFour,200);
    }else{
        setTimeout(generateTwo,200);
    }
};

const slideLeft = () =>{
    for(let i=0;i<row;i++){
        let num = [];
        for(let j = 0;j<col;j++){
            num.push(matrix[i][j]);
        }
        num = checker(num);
        for(let j=0;j<col;j++)
        {
            matrix[i][j] = num[j];
            let element = document.querySelector(`[data-position = '${i}_${j}']`);
            element.innerHTML = matrix[i][j] ? matrix[i][j] : "";
            element.classList.value = "";
            element.classList.add("box",`box-${matrix[i][j]}`);
        }
    }
    let decision = Math.random() > 0.5 ? 1 : 0;
    if(decision){
        setTimeout(generateFour,200);
    }else{
        setTimeout(generateTwo,200);
    }
};

document.addEventListener("keyup",(e)=>{
    if(e.code == "ArrowLeft"){
        slideLeft();
    } else if(e.code == "ArrowRight"){
        slideRight();
    } else if(e.code == "ArrowUp"){
        slideUp();
    } else if(e.code == "ArrowDown") {
        SlideDown();
    }
    document.getElementById("score").innerText = score;
});

grid.addEventListener("touchstart",(event)=>{
    isSwiped = true;
    getXY(event);
    intialX = touchX;
    intialY = touchY;
});

grid.addEventListener("touchmove",(event)=>{
    if(isSwiped){
        getXY(event);
        let diffX = touchX - intialX;
        let diffY = touchY - intialY;
        if(Math.abs(diffY) > Math.abs(diffX)){
            swipeDirection = diffX > 0 ? "down" : "up";
        }else{
            swipeDirection = diffX > 0 ? "right" : "left";
        }
    }
});

grid.addEventListener("touchend", () => { 
    isSwiped = false;
    let swipeCalls = {
        up: slideUp,
        down : SlideDown,
        left: slideLeft,
        right: slideRight,
    };
    swipeCalls[swipeDirection]();
    document.getElementById("score").innerText = score;
});

const startGame = () =>{
    score = 0;
    document.getElementById("score").innerText = score;
    grid.innerHTML = "";
    matrix= [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    container.classList.remove("hide");
    cover.classList.add("hide");
    createGrid();
    generateTwo();
    generateTwo();
};

start.addEventListener("click",()=>{
    startGame();
    swipeDirection = "";
});
