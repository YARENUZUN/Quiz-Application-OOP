function Question(soru,sıklar,sonuc){
    this.soru = soru;
    this.sıklar = sıklar;
    this.sonuc = sonuc;
}

//Question prorotype
Question.prototype.cevap = function(cvp){
    return this.sonuc === cvp;
   
}

//Quiz Constructor
function Quiz(question){
    this.question = question;
    this.score = 0;
    this.questionIndex = 0;

}

//Quiz Prototype
Quiz.prototype.getQuestion = function(){  //methot oluşturduk
    return this.question[this.questionIndex];   //questionIndex değerine göre bize bir soru getirecek.

}

//Quiz is Finish
Quiz.prototype.isFinish = function(){   //methot oluşturduk.
    return this.question.length === this.questionIndex;       //Quizin bitip bitmediğiyle alakalı bize boolean değer dönderecek.
}

//Quiz tahmin(quess) Quizlere verdiğimiz cevaplar
Quiz.prototype.Tahmin = function(sonuc){
    var q = this.getQuestion();

    if(q.cevap(sonuc)){
        this.score++ ;

    }
    this.questionIndex++;
}


//Question Constructor
var q1 = new Question('Aşağıdakilerden hangisi javascript kütüphanesidir?',
                        ['boostrap','c#','phython','react'],
                        'react');

var q2 = new Question('Web arayüzlerde kullanılan dillerden değildir?',
                        ['html','css','boostrap','sap'],
                        'sap');

var q3 = new Question('Yaren hangi bölümde okuyor?',
                        ['YBS','mühendislik','Tıp','veterinerlik'],
                        'YBS');


var question = [q1,q2,q3];   //soru dizisi oluşturduk.Bunları Constructor a göndereceğiz.



/********************************************************** */
//Quiz Başlat
// var quiz = new Quiz(question);

//  console.log(quiz.isFinish());               //false yazar.

//  console.log(quiz.getQuestion());            //1.soru geldi.
//  quiz.Tahmin('react');   

//  console.log(quiz.getQuestion());            //2.soru geldi.
//  quiz.Tahmin('sap');

// console.log(quiz.getQuestion());            //3.soru geldi.
// quiz.Tahmin('YBS');

// console.log(quiz.isFinish());               //true yazar. Çünkü tüm soruları getirdik. dizinin içerisinde 3 tane soru vardı ve biz de 3 tane soruyu getirdik burda.

//BİZ BURDA CONSOLE EKRANINDA GÖSTERDİK AŞŞAĞIDA İSE BUTTONLARA TIKLAMA OLAYLARINI YAPACAĞIZ.

//********************************************************** */

//Quiz Başlat:
var quiz = new Quiz(question);

loadQuestion();

function loadQuestion(){

    if(quiz.isFinish()){        //quizin bitip bitmediğini kontrol ettik.
        //scoru göster dedik:
        showScore();
    }

    else{
        var question = quiz.getQuestion();
        var choices = question.choices;

        document.querySelector('#question').textContent = question.text;

        for(var i=0; i<choices.length; i++){
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];

            guess('btn'+i,choices[i]);
        }
        showProgress();
    }
}

function guess(id,guess){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScore(){
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;
}

function showProgress(){
    var totalQuestion = quiz.question.length;
    var questionNumber = quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML = 'Question '+questionNumber + 'of ' +totalQuestion;
}