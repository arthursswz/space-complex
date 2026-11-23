
import Complex from './complex.js';

export default class Ship {
    constructor() {
        // Posição inicial da nave
        this.position = new Complex(450, 490);

        // Velocidade inicial
        this.velocity = new Complex(0, 0);

        // Direção inicial: apontando para cima
        this.direction = new Complex(0, -1);

        // Tempo de invulnerabilidade inicial
        this.invulnerability = 2.5;
    }

    // Rotaciona a nave
    rotate(angle) {
        this.direction = this.direction.mul(
            Complex.exp(angle)
        );

        // Mantém o módulo da direção igual a 1
        this.direction = this.direction.scale(
            1 / this.direction.abs()
        );
    }

    // Acelera a nave
    accelerate(force, dt) {
        const acceleration = this.direction.scale(force * dt);

        this.velocity = this.velocity.add(acceleration);
    }

    // Atualiza a movimentação da nave
    update(dt, gravity = null) {
        // Resistência ao movimento
        this.velocity = this.velocity.scale(
            Math.pow(0.75, dt)
        );

        // Aplicação da gravidade, quando fornecida
        if (gravity) {
            this.velocity = this.velocity.add(
                gravity.scale(dt)
            );
        }

        // Atualização da posição
        this.position = this.position.add(
            this.velocity.scale(dt)
        );

        // Atualização da invulnerabilidade
        this.invulnerability = Math.max(
            0,
            this.invulnerability - dt
        );
    }

    // Desenha a nave no Canvas
    draw(ctx) {
        const points = [
            new Complex(16, 0),
            new Complex(-11, -10),
            new Complex(-6, 0),
            new Complex(-11, 10)
        ];

        ctx.beginPath();

        points.forEach((point, index) => {
            const rotated = point.mul(this.direction);
            const finalPosition = this.position.add(rotated);

            if (index === 0) {
                ctx.moveTo(finalPosition.re, finalPosition.im);
            } else {
                ctx.lineTo(finalPosition.re, finalPosition.im);
            }
        });

        ctx.closePath();
        ctx.stroke();
    }
}
