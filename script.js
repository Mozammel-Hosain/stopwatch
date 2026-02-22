document.addEventListener('DOMContentLoaded', function(){
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const millisecondsEl = document.getElementById('milliseconds');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const lapsContainer = document.getElementById('lapsContainer');
        const lapsList = document.getElementById('lapsList');
        const clearLap = document.querySelector('.clear-laps')

        let startTime = 0;
        let elapsedTime = 0;
        let isRunning = false;
        let timeInterval = null;
        let countLap = 0;
        

        function formateTime(ms){
            const pressentTime = new Date(ms);
            m = String(Math.floor(ms / 60000)).padStart(2, '0')
            s = String(pressentTime.getUTCSeconds()).padStart(2, '0')
            msVal = String(Math.floor(pressentTime.getUTCMilliseconds() / 10)).padStart(2, '0')
            return {m, s, ms: msVal}
        }

        function updateDisplay(){
            const time = Date.now() - startTime + elapsedTime;
            const formatted = formateTime(time);
            minutesEl.textContent = formatted.m;
            secondsEl.textContent = formatted.s;
            millisecondsEl.textContent = formatted.ms;

        }


        startBtn.addEventListener('click', function(){
            if(!isRunning){
                startTime = Date.now()
                timeInterval = setInterval(updateDisplay, 10)
                isRunning = true;
                

                startBtn.disabled = true;
                stopBtn.disabled = false;
                lapBtn.disabled = false;
            }
            
        })

        stopBtn.addEventListener('click', function(){
            if(isRunning){
                clearInterval(timeInterval)
                elapsedTime += Date.now() - startTime
                isRunning = false;
                startBtn.disabled = false;
                stopBtn.disabled = true;
                
            }
        })

        lapBtn.addEventListener('click', function(){
             if(isRunning){
                countLap++;
                const currentTime = Date.now() - startTime + elapsedTime;
                const formetted = formateTime(currentTime)

                const lapTime = `${formetted.m}.${formetted.s}.${formetted.ms}`

                const lapItem = document.createElement('div')
                lapItem.className = 'lap-item'

                lapItem.innerHTML = `
                    <span class='lap-number'>Lap ${countLap}</span>
                    <span class='lap-time'>${lapTime}</span>
                `

                lapsList.insertBefore(lapItem, lapsList.firstChild)
                lapsContainer.classList.add('show')

             }
        })


        resetBtn.addEventListener('click', function(){
            if(isRunning){
                clearInterval(timeInterval)
                startTime = 0;
                elapsedTime = 0;    
                countLap = 0;
                minutesEl.textContent = '00'
                secondsEl.textContent = '00';
                millisecondsEl.textContent = '00';
                stopBtn.disabled = true;
                startBtn.disabled = false;
                lapBtn.disabled = true;
                resetBtn.disabled = true;
               
            }
           

        })

        clearLap.addEventListener('click', function(){
            lapsList.innerHTML = '';
            countLap = 0;
            lapsContainer.classList.remove('show')
        })
        
})