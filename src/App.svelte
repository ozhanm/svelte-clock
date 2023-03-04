<script>
    import { onMount } from "svelte";

    let date = new Date();
    $: hourdeg = getHourDegree(date);
    $: minutedeg = getMinuteDegree(date);
    $: seconddeg = getSecondDegree(date);

    onMount(() => {
        const interval = setInterval(() => {
            date = new Date();
            hourdeg = getHourDegree(date);
            minutedeg = getMinuteDegree(date);
            seconddeg = getSecondDegree(date);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    const getHourDegree = (date) => {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let data = 30 * (hour > 12 ? hour - 12 : hour) + minute * 0.5;
        return data;
    };
    const getMinuteDegree = (date) => {
        let minute = date.getMinutes();
        let data = 6 * minute;
        return data;
    };
    const getSecondDegree = (date) => {
        let second = date.getSeconds();
        let data = 6 * second;
        return data;
    };
</script>

<main>
    <div class="clock">
        {#each Array(12) as _, key}
            <span style="--key: {key + 1}">{key + 1}</span>
        {/each}

        <div class="indicator">
            <span
                class="hand hour"
                style={`transform: rotate(${hourdeg}deg)`}
            />
            <span
                class="hand minute"
                style={`transform: rotate(${minutedeg}deg)`}
            />
            <span
                class="hand second"
                style={`transform: rotate(${seconddeg}deg)`}
            />
        </div>
    </div>
</main>

<style lang="scss">
    main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eee;
    }
    .clock {
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 5px 25px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        span {
            position: absolute;
            text-align: center;
            inset: 15px;
            transform: rotate(calc(var(--key) * (360deg / 12)));
            pointer-events: none;
            font-weight: 600;
            color: #333;
            font-size: 20px;
            &:before {
                content: '';
                width: 2px;
                height: 13px;
                background: #999;
                position: absolute;
                left: 50%;
                margin-left: -1px;
                top: -15px;
            }
        }
        .indicator {
            width: 6px;
            height: 6px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            &:before {
                content: "";
                width: 100%;
                height: 100%;
                border: 4px solid #e00;
                border-radius: 50%;
                background: #e00;
                position: absolute;
                z-index: 1;
            }
            .hand {
                all: unset;
                position: absolute;
                bottom: 2px;
                border-radius: 5px;
                transform-origin: bottom;
                background: #666;
                z-index: 0;
                &:before {
                    display: none;
                }
                &.hour {
                    width: 8px;
                    height: 80px;
                    background: #444;
                }
                &.minute {
                    width: 6px;
                    height: 120px;
                }
                &.second {
                    width: 2px;
                    height: 150px;
                    background: #e00;
                }
            }
        }
    }
</style>
