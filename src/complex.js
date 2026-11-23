
export default class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    add(other) {
        return new Complex(
            this.re + other.re,
            this.im + other.im
        );
    }

    sub(other) {
        return new Complex(
            this.re - other.re,
            this.im - other.im
        );
    }

    mul(other) {
        return new Complex(
            this.re * other.re - this.im * other.im,
            this.re * other.im + this.im * other.re
        );
    }

    scale(k) {
        return new Complex(
            this.re * k,
            this.im * k
        );
    }

    abs() {
        return Math.hypot(this.re, this.im);
    }

    arg() {
        return Math.atan2(this.im, this.re);
    }

    conj() {
        return new Complex(this.re, -this.im);
    }

    static exp(theta) {
        return new Complex(
            Math.cos(theta),
            Math.sin(theta)
        );
    }
}
