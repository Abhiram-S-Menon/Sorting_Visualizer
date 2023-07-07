let inputn = document.getElementById('inputn');
let numarray = document.getElementById('numarray');
var n;
let array = [];
var distance;
async function Translate(animatecircle, animatecircle1) {
    return new Promise(resolve => {
        animatecircle.style.transitionDuration = `2s`;
        animatecircle1.style.transitionDuration = `2s`;

        var r1 = animatecircle.getBoundingClientRect();
        r1 = r1.left;
        var r2 = animatecircle1.getBoundingClientRect();
        r2 = r2.left;
        distance = r2 - r1;
        animatecircle.style.transform = `translate(${distance}px)`
        animatecircle1.style.transform = `translate(-${distance}px)`;

        animatecircle1.addEventListener('transitionend', resolve);
        animatecircle.addEventListener('transitionend', resolve);
    });

}
async function changeBackground(animatecircle, animatecircle1) {
    return new Promise(resolve => {
        animatecircle.style.animationName = 'color';
        animatecircle1.style.animationName = 'color';
        animatecircle.style.animationDuration = '0.45s';
        animatecircle1.style.animationDuration = '0.45s';

        animatecircle1.addEventListener('animationend', resolve);
        animatecircle.addEventListener('animationend', resolve);
    });
}
async function changeBackground1(animatecircle, animatecircle1) {
    return new Promise(resolve => {
        animatecircle.style.animationName = 'color1';
        animatecircle1.style.animationName = 'color1';
        animatecircle.style.animationDuration = '0.6s';
        animatecircle1.style.animationDuration = '0.6s';
        console.log(animatecircle.textContent);
        console.log(animatecircle1.textContent);

        animatecircle1.addEventListener('animationend', resolve);
        animatecircle.addEventListener('animationend', resolve);
    });
}
async function readtoArray() {
    array.length = 0;
    let numbers = numarray.value;
    array = numbers.split(',');
    if (array.length < n) {
        let k = n - array.length
        alert('Input ' + k + ' more number');
    }
    else if (array.length > n)
        alert('Size Exceeded!');
    else {
        $('#circles div').remove();

        array = array.map(Number);

        for (i = 0; i < array.length; ++i) {
            var div = document.createElement("div");
            div.setAttribute("id", `circle${i}`);
            div.setAttribute("data-index", i);
            div.classList.add('numincircle');

            var span = document.createElement("span");
            span.innerHTML = array[i];

            div.appendChild(span);

            document.getElementById('circles').appendChild(div);


        }

        for (i = 0; i < array.length - 1; ++i) {


            for (j = 0; j < array.length - i - 1; ++j) {
                var animatecircle = document.getElementById(`circle${j}`);
                var animatecircle1 = document.getElementById(`circle${j + 1}`);


                if (array[j] > array[j + 1]) {


                    await changeBackground(animatecircle, animatecircle1);
                    await Translate(animatecircle, animatecircle1);

                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;



                    if (n > 2) {
                        var div1 = document.createElement("div");
                        div1.classList.add('numincircle');
                        var span1 = document.createElement("span");
                        span1.innerHTML = array[j];
                        div1.appendChild(span1);
                        var parent = document.getElementById('circles');
                        parent.insertBefore(div1, parent.children[j]);
                        animatecircle1.remove();


                        var div2 = document.createElement("div");
                        div2.classList.add('numincircle');
                        var span2 = document.createElement("span");
                        span2.innerHTML = array[j + 1];
                        div2.appendChild(span2);


                        animatecircle.remove();

                        div2.setAttribute("id", `circle${j + 1}`);
                        div1.setAttribute("id", `circle${j}`);

                        div1.insertAdjacentElement('afterend', div2);



                    }

                }
                else 
                {
                    await changeBackground1(animatecircle, animatecircle1);
                    var div3 = document.createElement("div");
                    div3.classList.add('numincircle');
                    var span3 = document.createElement("span");
                    span3.innerHTML = array[j];
                    div3.appendChild(span3);
                    var parent = document.getElementById('circles');
                    parent.insertBefore(div3, parent.children[j]);
                    animatecircle.remove();

                    var div4 = document.createElement("div");
                    div4.classList.add('numincircle');
                    var span4 = document.createElement("span");
                    span4.innerHTML = array[j+1];
                    div4.appendChild(span4);
                    var parent = document.getElementById('circles');
                    parent.insertBefore(div4, parent.children[j+1]);
                    animatecircle1.remove();

                    div3.setAttribute("id", `circle${j}`);
                    div4.setAttribute("id", `circle${j+1}`);

                }



            }


        }
    }
}






function assignN() {
    n = inputn.value;
    if (n < 0)
        alert('The value cannot be negative!')
    else if (n == 0)
        alert('There should be atleast one number to sort!');
    else {
        numarray.disabled = false;
    }
}
inputn.onchange = assignN;
