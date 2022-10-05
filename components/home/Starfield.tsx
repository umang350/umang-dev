import Script from "next/script";
import React from "react";
import { useTheme } from 'next-themes';

export default function Starfield() {

    const { resolvedTheme } = useTheme();

    return (<> <Script
        id="starfiledScript"
        strategy="afterInteractive"
        onReady={() => {
            const COUNT = 800;
            const SPEED = 0.1;
            class Star {
                x: number;
                y: number;
                z: number;
                xPrev: number;
                yPrev: number;
                constructor(x = 0, y = 0, z = 0) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.xPrev = x;
                    this.yPrev = y;
                }
                update(width: number, height: number, speed: number) {
                    this.xPrev = this.x;
                    this.yPrev = this.y;
                    this.z += speed * 0.0675;
                    this.x += this.x * (speed * 0.0225) * this.z;
                    this.y += this.y * (speed * 0.0225) * this.z;
                    if (
                        this.x > width / 2 ||
                        this.x < -width / 2 ||
                        this.y > height / 2 ||
                        this.y < -height / 2
                    ) {
                        this.x = Math.random() * width - width / 2;
                        this.y = Math.random() * height - height / 2;
                        this.xPrev = this.x;
                        this.yPrev = this.y;
                        this.z = 0;
                    }
                }
                draw(ctx: CanvasRenderingContext2D) {
                    ctx.lineWidth = this.z;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.xPrev, this.yPrev);
                    ctx.stroke();
                }
            }
            const stars = Array.from({ length: COUNT }, () => new Star(0, 0, 0));
            let rafId = 0;
            const canvas: HTMLCanvasElement | null = document.querySelector("#starfield-canvas");
            const container = document.querySelector("#starfield");
            const ctx = canvas.getContext("2d");
            const resizeObserver = new ResizeObserver(setup);
            resizeObserver.observe(container);
            function setup() {
                rafId > 0 && cancelAnimationFrame(rafId);
                const { clientWidth: width, clientHeight: height} = container;
                var body = document.body;
                var html = document.documentElement;
                var pageheight = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight );
                const dpr = window.devicePixelRatio || 1;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${pageheight}px`;
                ctx.scale(dpr, dpr);
                for (const star of stars) {
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.z = 0;
                }
                ctx.translate(width / 2, height / 2);
                ctx.fillStyle = resolvedTheme === 'dark' ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.4)";
                ctx.strokeStyle = resolvedTheme === 'dark' ? "white" : "black";
                rafId = requestAnimationFrame(frame);
            }
            function frame() {
                const { clientWidth: width, clientHeight: height } = container;
                var body = document.body;
                var html = document.documentElement;
                var pageheight = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight );
                for (const star of stars) {
                    star.update(width, pageheight, SPEED);
                    star.draw(ctx);
                }
                ctx.fillRect(-width / 2, -height / 2, width, height);
                rafId = requestAnimationFrame(frame);

            }
        }}>

    </Script>
        <div id="starfield" className="absolute inset-0">
            <canvas id="starfield-canvas"></canvas>
        </div></>
    )
};