<script>
    import { onMount } from "svelte";

    export let thememode;
    $: themetext = thememode == "LIGHT" ? "DARK THEME" : "LIGHT THEME";

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
    const clickHandle = () => {
        thememode = thememode == "LIGHT" ? "DARK" : "LIGHT";
    };
</script>

<main class={`theme${thememode}`}>
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
    <button class="themebtn" on:click={clickHandle}>{themetext}</button>
</main>

<style lang="scss">
    main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f3f3f3;
        flex-direction: column;
        &.themeDARK {
            background: #666;
            .themebtn {
                color: #333;
                background: #fff;
            }
            .clock {
                background: #444;
                box-shadow: 0 5px 25px #888;
                span {
                    color: #fff;
                    &:before {
                        background: #333;
                    }
                }
                .indicator {
                    .hand {
                        background: #eee;
                        &.hour {
                            background: #ccc;
                        }
                    }
                }
            }
        }
    }
    .themebtn {
        margin: 50px 0;
        color: #fff;
        background: #222;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 8px 25px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
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
                content: "";
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
    @media (max-width: 499px) {
        .clock {
            width: 320px;
            height: 320px;
            .indicator {
                .hand {
                    &.hour {
                        height: 70px;
                    }
                    &.minute {
                        height: 100px;
                    }
                    &.second {
                        height: 110px;
                    }
                }
            }
        }
    }
</style>
