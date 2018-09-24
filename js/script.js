_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

jQuery.fn.cardGame = function(data) {
    var $self = $(this),
        questionsData = data.questionsData,
        $card = $("#card", $self),
        $front = $("#card-front", $card),
        $back = $("#card-back", $card),
        questionTmpl = _.template($("#question__tmpl").html()),
        answerTmpl = _.template($("#answer__tmpl").html()),
        flipDirection = true,
        answers = new Array(6);

    $card.flip({
        trigger: 'manual',
        axis: 'y'
    });

    $card.on("click.cardGame", ".js-to-question, .js-to-answer", function(e) {
        var $this = $(e.currentTarget),
            questionId = $this.data("question"),
            answerIndex = $this.data("answerIndex"),
            answerValue= $this.data("answerValue"),
            $side = flipDirection ? $front : $back;

        flipDirection = !flipDirection;

        if (answerIndex != null) {

            answers[answerIndex] = answerValue;

        }

        if (questionId <= 6) {
            $side.html(questionTmpl(_.extend(questionsData[questionId], {id: questionId})));
        } else {

            var count = _.reduce(answers, function(memo, num){ return memo + num; }, 0);

            var title = "";

            switch (count) {
                case 6:
                    title = 'Поздравляем! Вы не потратили ни одной минуты зря! Вы настоящий мастер тайм-менеджмента!'
                    break;
                case 5:
                case 4:
                    title = 'Приемы из статьи помогли бы Вам сэкономить 20% рабочего времени!'
                    break;
                case 3:
                case 2:
                    title = 'Приемы из статьи помогли бы Вам сэкономить 40% рабочего времени!'
                    break;
                default:
                    title = 'Приемы из статьи помогли бы Вам сэкономить 50% рабочего времени!'
                    break;

            }



            var tmplData = {
                count: count,
                title: title
            };

            $side.html(answerTmpl(tmplData));
        }




        $card.flip(flipDirection);

    });


    return {
        init: function () {
            setTimeout(function () {
                $card.flip(flipDirection);
            }, 1000);
        }
    }


};


$("#cardgame").cardGame(data).init();






