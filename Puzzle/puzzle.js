$(()=>{
    const puzzle = $("#puzzle")
    let puzzlee = []
    let id = 0
    let a = 0
    let left = 0
    let count = 0
    let test = 0
    let topp = 0
    let index = 0
    for(let row = 0; row < 6; row++) {
        for(let col = 0; col < 8; col++) {
            puzzle.append(`<div id="${id+a}"></div>`)
            if(id == 7){
                id=0
                a+=10
            }else{

                id++
            }
            puzzle.children().last().css({
                top: rand(0, 600) + 'px',
                left: rand(800, $(window).width() - 170 ) + 'px',
                transform: `rotate(${rand(-45, 45)}deg)`,
                background: `url('img/cartoon.webp') ${-100 * col}px ${-100 * row}px`,

            })
        }
    }

    puzzle.children().draggable({
        snap: puzzle.children(),
        start: function() {
            $(this).css({ transform: 'rotate(0deg)', zIndex: 99 })
        },
        drag: function() {
        },
        stop: function() {
            $(this).css({ 
                left : `${left = (100 * Math.round( $(this).position().left / 100))}px`,
                top : `${topp = (100 * Math.round( $(this).position().top / 100))}px`,
                boxShadow: 'none'
            })
            index = parseInt($(this).attr('id'))
            if(((topp/10)+(left/100)) == index && topp < 800 && left < 900){ 
                if(puzzlee[0] == undefined){
                    count++
                    puzzlee.push(index)
                }else{
                    for (i = 0; i < puzzlee.length; i++) {
                        if(index == puzzlee[i]){
                            test = 1
                            break
                        }else{test=0}
                    }
                    if(test!=1){
                        count++
                        puzzlee.push(index)
                        test=0
                    }
                }
            }else{
                for (const pzl of puzzlee) {
                    if(index == pzl){
                        puzzlee.splice(puzzlee.indexOf(index), 1)
                        count--
                    }
                }
            }
            if(count==48){
                alert('WIN')
            }
        }
    })

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
})