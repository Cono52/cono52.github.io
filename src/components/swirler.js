import React, { Component } from 'react'

class Swirler extends Component {

    componentDidMount(){
        let initialise = function() {
            let application = new Application();
            // application.scaleFactor = 2;
            application.clearOnRedraw = Application.FADE;
            application.fadeColour = 'hsla(345, 100%, 7.1%, 0.2';
            application.fillColour = 'hsla(345, 100%, 7.1%, 0.2';
            application.onResize();
            let vfield = new VectorField();
            vfield.scale = 300;
            vfield.amplitude = 40;
            // vfield.debug = true;

            application.addActor(vfield);

            let maxNum = 500;
            let num = 0;

            let addTracer = (position, colour)=> {
              if(num > maxNum) return;

              num++;

              let tracer = new BranchTracer(position.x, position.y);
              tracer.field = vfield;
              let momentum = new Vector(Math.random(), Math.random());
              momentum.length = Math.random() * 2;
              tracer.momentum = momentum;
              tracer.friction = 0.95;

              if(colour) {
                tracer.colour = colour;
              } else {
                tracer.colour = 'hsla(0,100%,100%, 1.0)';
              }





              application.addActor(tracer);
              return tracer;
            }
            let seed = addTracer(new Vector(window.innerWidth / 2, window.innerHeight / 2), 'hsla(0,100%,100%, 1.0)');
            seed.branchChance = 100.0;
            seed.friction = 0.95;
            seed.onBranch = addTracer;

            setInterval(()=> {
              vfield.z = Math.random() * 10000;
            }, 10000)


            let stage = application.stage;
            document.body.appendChild(stage);
            application.onPointerMove({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
            application.render();
            application.animating = true;

            // application.runFor(60 * 120);

            return;
          }










          class Application {
            constructor() {
              this.stage = document.querySelector('.drawer');
              this.animate = this.animate.bind(this);

              this.onResize = this.onResize.bind(this);
              this.onPointerDown = this.onPointerDown.bind(this);
              this.onPointerup = this.onPointerup.bind(this);
              this.onPointerMove = this.onPointerMove.bind(this);

              this.initialiseEvents();
            }

            initialiseEvents() {
              window.addEventListener('resize', this.onResize, false);
              document.addEventListener('pointerdown', this.onPointerDown, false);
              document.addEventListener('pointerup', this.onPointerup, false);
              document.addEventListener('pointermove', this.onPointerMove, false);
            }

            deInitialiseEvents() {
              window.removeEventListener('resize', this.onResize, false);
              document.removeEventListener('pointerdown', this.onPointerDown, false);
              document.removeEventListener('pointerup', this.onPointerup, false);
              document.removeEventListener('pointermove', this.onPointerMove, false);
            }

            addActor(actor) {
              if(actor instanceof Actor) {
                this.actors.push(actor);
              }
            }

            runFor(ticks) {
              let interval = 1 / 100;
              let i = 0;

              for(i; i < ticks; i++) {
                this.triggerEvent('application-animate', { now: this.now, then: this.then, interval: interval, application: this });

                this.render();
              }

            }

            animate() {
              this.now = Date.now();
              let interval = this.now - this.then;

              this.triggerEvent('application-animate', { now: this.now, then: this.then, interval: interval, application: this });

              this.render();

              this.then = this.now;

              if(this.animating) {
                requestAnimationFrame(this.animate);
              }
            }

            render() {
              let dims = this.dimensions;

              if(this.clearOnRedraw === Application.CLEAR) {
                this.context.clearRect(0, 0, dims.width, dims.height);
              } else if(this.clearOnRedraw === Application.FADE) {
                this.context.fillStyle = this.fadeColour;
                this.context.fillRect(0,0, dims.width, dims.height);
              }

              this.actors.forEach((actor)=> {
                actor.render(this);
              });
            }

            onResize(e) {
              this.dimensions = new Vector(window.innerWidth, window.innerHeight);
            }
            onPointerDown(e) {

            }
            onPointerup(e) {

            }
            onPointerMove(e) {
              let pointer = new Vector(e.clientX, e.clientY);
              this.triggerEvent('application-pointermove', { pointer: pointer });
            }

            triggerEvent(event, data) {
              let custEvent;
              if (window.CustomEvent) {
                custEvent = new CustomEvent(event, {detail: data});
              } else {
                custEvent = document.createEvent('CustomEvent');
                custEvent.initCustomEvent(event, true, true, data);
              }

              document.dispatchEvent(custEvent);
            }

            get actors() {
              if( !this._actors ) this._actors = [];

              return this._actors;
            }

            set scaleFactor(value) {
              if(value >= 1) {
                this._scaleFactor = value;
                this.onResize();
              }
            }
            get scaleFactor() {
              return this._scaleFactor || 1;
            }

            set dimensions(value) {
              if( value instanceof Vector ) {
                value.scale(this.scaleFactor)
                this.stage.width = value.width;
                this.stage.height = value.height;
                this.context.fillStyle = this.fillColour;
                this.context.fillRect(0,0, this.dimensions.width, this.dimensions.height);
                this._dimensions = value;
              }
            }
            get dimensions() {
              return this._dimensions || new Vector(0,0)
            }

            set stage(value) {
              if(value instanceof HTMLCanvasElement) {
                value.className = this.className;
                this._stage = value;
                this.context = this.stage.getContext('2d');
                this.context.fillStyle = this.fillColour;
                this.context.fillRect(0,0, this.dimensions.width, this.dimensions.height);
                this.onResize();
              }
            }
            get stage() {
              return this._stage || null;
            }

            set now(value) {
              if(!isNaN(value)) this._now = value
            }
            get now() {
              return this._now || 0;
            }

            set then(value) {
              if(!isNaN(value)) this._then = value
            }
            get then() {
              return this._then || 0;
            }

            set animating(value) {
              if(value === true && this.animating !== true) {
                this._animating = true;

                this.now = Date.now();
                this.then = this.now;

                requestAnimationFrame(this.animate);
              }
            }
            get animating() {
              return this._animating === true;
            }

            set fadeColour(value) {
              this._fadeColour = value;
            }
            get fadeColour() {
              return this._fadeColour || 'rgba(255,255,255,.5)';
            }

            set fillColour(value) {
              this._fillColour = value;
            }
            get fillColour() {
              return this._fillColour || 'rgba(255,255,255,1)';
            }

            set clearOnRedraw(value) {
              if([Application.NOCLEAR, Application.CLEAR, Application.FADE].indexOf(value) > -1 ) {
                this._clearOnRedraw = value;
              }
            }
            get clearOnRedraw() {
              return this._clearOnRedraw || Application.NOCLEAR;
            }

            get className() {
              return 'drawer';
            }
          }

          Application.NOCLEAR = 0;
          Application.CLEAR = 1;
          Application.FADE = 2;

          class Actor {
            constructor(x, y, w, h) {
              this.dimensions = new Vector(w, h);
              this.position = new Vector(x, y);
            }

            render() {

            }

            set dimensions(value) {
              if(value instanceof Vector) this._dimensions = value;
            }
            get dimensions() {
              return this._dimensions || new Vector(0,0);
            }

            set position(value) {
              if(value instanceof Vector) this._position = value;
            }
            get position() {
              return this._position || new Vector(0,0);
            }
          }

          class VectorField extends Actor {
            constructor(x = 0, y = 0, w = 0, h = 0) {
              super(x, y, w, h);

              this.noise = new Noise();

              this.helpers = [];

              this.mousepos = new Vector(0, 0);

              this.onResize = this.onResize.bind(this);
              this.onPointerMove = this.onPointerMove.bind(this);

              // document.addEventListener('application-pointermove', this.onPointerMove, false);
              window.addEventListener('resize', this.onResize);
              this.onResize();
            }

            render(application) {
              this.helpers.forEach((helper)=> {
                helper.render(application);
              })
            }

            preDraw() {}
            postDraw() {}

            solveForPosition(v) {
              if(!v instanceof Vector) return

              v = v.clone();
              v.x -= window.innerWidth / 2;
              v.y -= window.innerHeight / 2;

              let scale = this.scale;
              //let amp = this.amplitude;

          //     let waveform = new Vector(Math.cos(v.x / scale) * amp, Math.sin(v.y / scale) * amp);
          //     return new Vector(waveform.y - waveform.x, -waveform.x - waveform.y);

              let envelope = this.amplitude;

              let noise = this.noise.noise(v.x / scale, v.y / scale, this.z) * scale;
              if(noise > envelope) noise = envelope;
              if(noise < -envelope) noise = -envelope;
              let noise1 = this.noise.noise(v.y / scale, v.x / scale, this.z / scale);
              let transV = new Vector(1, 0);
              transV.length = noise;
              transV.angle = noise1 * 10;
              return transV;

              // let transv = v.subtractNew(this.mousepos);
              // transv = new Vector(transv.y - transv.x, -transv.x - transv.y);

              // transv.length *= 0.03;
              // if(transv.length > 50) {
              //   transv.length = 50;
              // }
              // transv.length -= 50;
              // transv.length *= -1;

              // return transv;
            }

            onPointerMove(e) {
              this.mousepos = e.detail.pointer;

              this.helpers.forEach((helper)=> {
                helper.vector = this.solveForPosition(helper.position);
              });
            }

            onResize(e) {

            }

            set scale(value) {
              if(value > 0) {
                this._scale = value;
              }
            }
            get scale() {
              return this._scale || 500;
            }

            set amplitude(value) {
              if(value > 0) {
                this._amplitude = value;
              }
            }
            get amplitude() {
              return this._amplitude || 10;
            }

            set sampleWidth(value) {
              if(value > 0) this._sampleWidth = value;
            }
            get sampleWidth() {
              return this._sampleWidth || 30;
            }

            set z(value) {
              if(value > 0) this._z = value;
            }
            get z() {
              return this._z || 30;
            }

            set mousepos(value) {
              if(value instanceof Vector) this._mousepos = value;
            }
            get mousepos() {
              return this._mousepos || new Vector(0,0);
            }

            set debug(value) {
              this._debug = value === true;
            }
            get debug() {
              return this._debug === true;
            }

            get strokeStyle() {
              return 'black';
            }

            get strokeWidth() {
              return 0;
            }
          }

          class Tracer extends Actor {
            constructor(x = 200, y = 200, w = 40, h = 20) {
              super(x, y, w, h);

              this.onAnimate = this.onAnimate.bind(this);

              document.addEventListener('application-animate', this.onAnimate, false);

              this.friction = 0.99;
              this.momentum = new Vector(1,0);
            }

            onAnimate(e) {
              let force = this.field.solveForPosition(this.position).multiplyScalar(0.011);
              let app = e.detail.application;
              let oldPosition = this.position.clone();
              let draw = true;

              this.momentum.add(force);
              this.momentum.multiplyScalar(this.friction);
              if(this.momentum.length < 1) this.momentum.length = 1;
              if(this.momentum.length > 20) this.momentum.length = 20;
              this.position.add(this.momentum);

              if(this.position.x < -this.dimensions.width) {
                this.position.x = app.dimensions.width + this.dimensions.width;
                draw = false;
              } else if(this.position.x > app.dimensions.width + this.dimensions.width) {
                this.position.x = -this.dimensions.width;
                draw = false;
              }
              if(this.position.y < -this.dimensions.height) {
                this.position.y = app.dimensions.height + this.dimensions.height;
                draw = false;
              } else if(this.position.y > app.dimensions.height + this.dimensions.height) {
                this.position.y = -this.dimensions.height;
                draw = false;
              }

              if(draw) {
                let context = app.context;
                //let opacity = Math.abs( (this.momentum.length - 10) / 20 );
                // console.log(opacity, this.momentum.length);
                // console.log(oldPosition, this.position);

                context.beginPath();
                context.lineWidth = this.momentum.length / 2;
                context.strokeStyle = this.colour;
                context.moveTo(oldPosition.x, oldPosition.y);
                context.lineTo(this.position.x, this.position.y);
                context.stroke();
              }

            }

            set colour(value) {
              this._colour = value;
            }
            get colour() {
              return this._colour || 'RGBA(255,255,255,0.0)';
            }
          }


          class BranchTracer extends Tracer {

            onAnimate(e) {
              super.onAnimate(e);

              if(Math.random() * 100 < this.branchChance) {
                this.onBranch(this.position);
              }
            }

            set onBranch(value) {
              if(typeof value === 'function') this._onBranch = value.bind(this);
            }
            get onBranch() {
              return this._onBranch || function() { }
            }

            set branchChance(value) {
              if(value > 0 && value <= 100) this._branchChance = value;
            }
            get branchChance() {
              return this._branchChance || 0.2;
            }
          }










          class Noise {
            constructor(r) {
              if (r === undefined) r = Math;
              this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                                             [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                                             [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
              this.p = [];
              for (let i=0; i<256; i++) {
                this.p[i] = Math.floor(r.random()*256);
              }
              // To remove the need for index wrapping, double the permutation table length
              this.perm = [];
              for(let i=0; i<512; i++) {
                this.perm[i]=this.p[i & 255];
              }
            }

            dot(g, x, y, z) {
              return g[0]*x + g[1]*y + g[2]*z;
            }

            mix(a, b, t) {
              return (0.8-t)*a + t*b;
            }

            fade(t) {
              return t*t*t*(t*(t*6.0-15.0)+10.0);
            }

            noise(x, y, z) {
              // Find unit grid cell containing point
              var X = Math.floor(x);
              var Y = Math.floor(y);
              var Z = Math.floor(z);

              // Get relative xyz coordinates of point within that cell
              x = x - X;
              y = y - Y;
              z = z - Z;

              // Wrap the integer cells at 255 (smaller integer period can be introduced here)
              X = X & 255;
              Y = Y & 255;
              Z = Z & 255;

              // Calculate a set of eight hashed gradient indices
              var gi000 = this.perm[X+this.perm[Y+this.perm[Z]]] % 12;
              var gi001 = this.perm[X+this.perm[Y+this.perm[Z+1]]] % 12;
              var gi010 = this.perm[X+this.perm[Y+1+this.perm[Z]]] % 12;
              var gi011 = this.perm[X+this.perm[Y+1+this.perm[Z+1]]] % 12;
              var gi100 = this.perm[X+1+this.perm[Y+this.perm[Z]]] % 12;
              var gi101 = this.perm[X+1+this.perm[Y+this.perm[Z+1]]] % 12;
              var gi110 = this.perm[X+1+this.perm[Y+1+this.perm[Z]]] % 12;
              var gi111 = this.perm[X+1+this.perm[Y+1+this.perm[Z+1]]] % 12;

              // The gradients of each corner are now:
              // g000 = grad3[gi000];
              // g001 = grad3[gi001];
              // g010 = grad3[gi010];
              // g011 = grad3[gi011];
              // g100 = grad3[gi100];
              // g101 = grad3[gi101];
              // g110 = grad3[gi110];
              // g111 = grad3[gi111];
              // Calculate noise contributions from each of the eight corners
              var n000= this.dot(this.grad3[gi000], x, y, z);
              var n100= this.dot(this.grad3[gi100], x-1, y, z);
              var n010= this.dot(this.grad3[gi010], x, y-1, z);
              var n110= this.dot(this.grad3[gi110], x-1, y-1, z);
              var n001= this.dot(this.grad3[gi001], x, y, z-1);
              var n101= this.dot(this.grad3[gi101], x-1, y, z-1);
              var n011= this.dot(this.grad3[gi011], x, y-1, z-1);
              var n111= this.dot(this.grad3[gi111], x-1, y-1, z-1);
              // Compute the fade curve value for each of x, y, z
              var u = this.fade(x);
              var v = this.fade(y);
              var w = this.fade(z);
               // Interpolate along x the contributions from each of the corners
              var nx00 = this.mix(n000, n100, u);
              var nx01 = this.mix(n001, n101, u);
              var nx10 = this.mix(n010, n110, u);
              var nx11 = this.mix(n011, n111, u);
              // Interpolate the four results along y
              var nxy0 = this.mix(nx00, nx10, v);
              var nxy1 = this.mix(nx01, nx11, v);
              // Interpolate the two last results along z
              var nxyz = this.mix(nxy0, nxy1, w);

              return nxyz;
            }
          }


          const conversionFactor = 180 / Math.PI;

          let radianToDegrees = function(radian) {
              return radian * conversionFactor;
          }
          let degreesToRadian = function(degrees) {
              return degrees / conversionFactor;
          }

          // Taken from https://github.com/wethegit/wtc-vector
          /**
           * A basic 2D Vector class that provides simple algebraic functionality in the form
           * of 2D Vectors.
           *
           * We use Getters/setters for both principle properties (x & y) as well as virtual
           * properties (rotation, length etc.).
           *
           * @class Vector
           * @author Liam Egan <liam@wethecollective.com>
           * @version 0.1.1
           * @created Dec 19, 2016
           */
          class Vector {

              /**
               * The Vector Class constructor
               *
               * @constructor
               * @param {number} x 				The x coord
               * @param {number} y 				The y coord
               */
            constructor(x, y){
              this.x = x;
              this.y = y;
            }

            /**
             * Resets the vector coordinates
             *
             * @public
               * @param {number} x 				The x coord
               * @param {number} y 				The y coord
             */
              reset(x, y) {
              this.x = x;
              this.y = y;
              }

              /**
               * Clones the vector
               *
               * @public
               * @return {Vector}					The cloned vector
               */
            clone() {
              return new Vector(this.x, this.y);
            }

            /**
             * Adds one vector to another.
             *
             * @public
             * @chainable
             * @param  {Vector}  vector The vector to add to this one
             * @return {Vector}					Returns itself, modified
             */
            add(vector) {
              this.x += vector.x;
              this.y += vector.y;
              return this;
            }
            /**
             * Clones the vector and adds the vector to it instead
             *
             * @public
             * @chainable
             * @param  {Vector}  vector The vector to add to this one
             * @return {Vector}					Returns the clone of itself, modified
             */
            addNew(vector) {
              let v = this.clone();
              return v.add(vector);
            }

            /**
             * Adds a scalar to the vector, modifying both the x and y
             *
             * @public
             * @chainable
             * @param  {number}  scalar The scalar to add to the vector
             * @return {Vector}					Returns itself, modified
             */
            addScalar(scalar) {
              return this.add(new Vector(scalar, scalar));
            }
            /**
             * Clones the vector and adds the scalar to it instead
             *
             * @public
             * @chainable
             * @param  {number}  scalar The scalar to add to the vector
             * @return {Vector}					Returns the clone of itself, modified
             */
            addScalarNew(scalar) {
              let v = this.clone();
              return v.addScalar(scalar);
            }

            /**
             * Subtracts one vector from another.
             *
             * @public
             * @chainable
             * @param  {Vector}  vector The vector to subtract from this one
             * @return {Vector}					Returns itself, modified
             */
            subtract(vector) {
              this.x -= vector.x;
              this.y -= vector.y;
              return this;
            }
            /**
             * Clones the vector and subtracts the vector from it instead
             *
             * @public
             * @chainable
             * @param  {Vector}  vector The vector to subtract from this one
             * @return {Vector}					Returns the clone of itself, modified
             */
            subtractNew(vector) {
              let v = this.clone();
              return v.subtract(vector);
            }

            /**
             * Subtracts a scalar from the vector, modifying both the x and y
             *
             * @public
             * @chainable
             * @param  {number}  scalar The scalar to subtract from the vector
             * @return {Vector}					Returns itself, modified
             */
            subtractScalar(scalar) {
              return this.subtract(new Vector(scalar, scalar));
            }
            /**
             * Clones the vector and subtracts the scalar from it instead
             *
             * @public
             * @chainable
             * @param  {number}  scalar The scalar to add to the vector
             * @return {Vector}					Returns the clone of itself, modified
             */
            subtractScalarNew(scalar) {
              let v = this.clone();
              return v.subtractScalar(scalar);
            }

            /**
             * Divides one vector by another.
             *
             * @public
             * @chainable
             * @param  {Vector}  vector The vector to divide this by
             * @return {Vector}					Returns itself, modified
             */
            divide(vector) {
              if(vector.x !== 0) {
                this.x /= vector.x
              } else {
                this.x = 0;
              }
              if(vector.y !== 0) {
                this.y /= vector.y
              } else {
                this.y = 0;
              }
              return this;
            }
            /**
             * Clones the vector and divides it by the vector instead
             *
             * @public
             * @chainable
             * @param  {Vector}  vector The vector to divide the clone by
             * @return {Vector}					Returns the clone of itself, modified
             */
            divideNew(vector) {
              let v = this.clone();
              return v.divide(vector);
            }

            /**
             * Divides the vector by a scalar.
             *
             * @public
             * @chainable
             * @param  {number}  scalar The scalar to divide both x and y by
             * @return {Vector}					Returns itself, modified
             */
            divideScalar(scalar) {
              var v = new Vector(scalar, scalar);
              return this.divide(v);
            }
            /**
             * Clones the vector and divides it by the provided scalar.
             *
             * @public
             * @chainable
             * @param  {number}  scalar The scalar to divide both x and y by
             * @return {Vector}					Returns the clone of itself, modified
             */
            divideScalarNew(scalar) {
              let v = this.clone();
              return v.divideScalar(scalar);
            }

            /**
             * Multiplies one vector by another.
             *
             * @public
             * @chainable
             * @param  {Vector}  vector The vector to multiply this by
             * @return {Vector}					Returns itself, modified
             */
            multiply(vector) {
              this.x *= vector.x;
              this.y *= vector.y;
              return this;
            }
            /**
             * Clones the vector and multiplies it by the vector instead
             *
             * @public
             * @chainable
             * @param  {Vector}  vector The vector to multiply the clone by
             * @return {Vector}					Returns the clone of itself, modified
             */
            multiplyNew(vector) {
              let v = this.clone();
              return v.multiply(vector);
            }

            /**
             * Multiplies the vector by a scalar.
             *
             * @public
             * @chainable
             * @param  {number}  scalar The scalar to multiply both x and y by
             * @return {Vector}					Returns itself, modified
             */
            multiplyScalar(scalar) {
              var v = new Vector(scalar, scalar);
              return this.multiply(v);
            }
            /**
             * Clones the vector and multiplies it by the provided scalar.
             *
             * @public
             * @chainable
             * @param  {number}  scalar The scalar to multiply both x and y by
             * @return {Vector}					Returns the clone of itself, modified
             */
            multiplyScalarNew(scalar) {
              let v = this.clone();
              return v.multiplyScalar(scalar);
            }

            /**
             * Alias of {@link Vector#multiplyScalar__anchor multiplyScalar}
             */
            scale(scalar) {
              return this.multiplyScalar(scalar);
            }
            /**
             * Alias of {@link Vector#multiplyScalarNew__anchor multiplyScalarNew}
             */
            scaleNew(scalar) {
              return this.multiplyScalarNew(scalar);
            }

            /**
             * Rotates a vecor by a given amount, provided in radians.
             *
             * @public
             * @chainable
             * @param  {number}  radian The angle, in radians, to rotate the vector by
             * @return {Vector}					Returns itself, modified
             */
            rotate(radian) {
                var x = (this.x * Math.cos(radian)) - (this.y * Math.sin(radian));
                var y = (this.x * Math.sin(radian)) + (this.y * Math.cos(radian));

                  this.x = x;
                  this.y = y;

                return this;
            }
            /**
             * Clones the vector and rotates it by the supplied radian value
             *
             * @public
             * @chainable
             * @param  {number}  radian The angle, in radians, to rotate the vector by
             * @return {Vector}					Returns the clone of itself, modified
             */
            rotateNew(radian) {
              let v = this.clone();
              return v.rotate(radian);
            }

              /**
               * Rotates a vecor by a given amount, provided in degrees. Converts the degree
               * value to radians and runs the rotaet method.
               *
               * @public
               * @chainable
               * @param  {number}  degrees The angle, in degrees, to rotate the vector by
               * @return {Vector}						Returns itself, modified
               */
            rotateDeg(degrees) {
              return this.rotate(degreesToRadian(degrees));
            }
            /**
             * Clones the vector and rotates it by the supplied degree value
             *
             * @public
             * @chainable
               * @param  {number}  degrees The angle, in degrees, to rotate the vector by
             * @return {Vector}					 Returns the clone of itself, modified
             */
            rotateDegNew(degrees) {
              return this.rotateNew(degreesToRadian(degrees));
            }

            /**
             * Alias of {@link Vector#rotate__anchor rotate}
             */
            rotateBy(radian) {
                  return this.rotate(radian);
            }
            /**
             * Alias of {@link Vector#rotateNew__anchor rotateNew}
             */
            rotateByNew(radian) {
              return this.rotateNew(radian);
            }

            /**
             * Alias of {@link Vector#rotateDeg__anchor rotateDeg}
             */
            rotateDegBy(degrees) {
                  return this.rotateDeg(degrees);
            }
            /**
             * Alias of {@link Vector#rotateDegNew__anchor rotateDegNew}
             */
            rotateDegByNew(radian) {
             // return tjos.rotateDegNew(radian);
            }

            /**
             * Rotates a vector to a specific angle
             *
             * @public
             * @chainable
             * @param  {number}  radian The angle, in radians, to rotate the vector to
             * @return {Vector}					Returns itself, modified
             */
              rotateTo(radian) {
                  return this.rotate(radian-this.angle);
              };
            /**
             * Clones the vector and rotates it to the supplied radian value
             *
             * @public
             * @chainable
             * @param  {number}  radian The angle, in radians, to rotate the vector to
             * @return {Vector}					Returns the clone of itself, modified
             */
              rotateToNew(radian) {
              let v = this.clone();
              return v.rotateTo(radian);
              };

              /**
               * Rotates a vecor to a given amount, provided in degrees. Converts the degree
               * value to radians and runs the rotateTo method.
               *
               * @public
               * @chainable
               * @param  {number}  degrees The angle, in degrees, to rotate the vector to
               * @return {Vector}						Returns itself, modified
               */
            rotateToDeg(degrees) {
              return this.rotateTo(degreesToRadian(degrees));
            }
            /**
             * Clones the vector and rotates it to the supplied degree value
             *
             * @public
             * @chainable
               * @param  {number}  degrees The angle, in degrees, to rotate the vector to
             * @return {Vector}					 Returns the clone of itself, modified
             */
            rotateToDegNew(degrees) {
              return this.rotateToNew(degreesToRadian(degrees));
            }

              /**
               * Normalises the vector down to a length of 1 unit
               *
               * @public
               * @chainable
               * @return {Vector}					Returns itself, modified
               */
              normalise() {
                  return this.divideScalar(this.length);
              }
              /**
               * Clones the vector and normalises it
               *
               * @public
               * @chainable
               * @return {Vector}					Returns a clone of itself, modified
               */
              normaliseNew() {
                  return this.divideScalarNew(this.length);
              }

              /**
               * Calculates the distance between this and the supplied vector
               *
               * @param  {Vector} vector The vector to calculate the distance from
               * @return {number}        The distance between this and the supplied vector
               */
              distance(vector) {
                  return this.subtractNew(vector).length;
              }

              /**
               * Calculates the distance on the X axis between this and the supplied vector
               *
               * @param  {Vector} vector The vector to calculate the distance from
               * @return {number}        The distance, along the x axis, between this and the supplied vector
               */
              distanceX(vector) {
                  return this.x - vector.x;
              }

              /**
               * Calculated the distance on the Y axis between this and the supplied vector
               *
               * @param  {Vector} vector The vector to calculate the distance from
               * @return {number}        The distance, along the y axis, between this and the supplied vector
               */
              distanceY(vector) {
                  return this.y - vector.y;
              }


              /**
               * Calculates the dot product between this and a supplied vector
               *
               * @example
               * // returns -14
               * new Vector(2, -3).dot(new Vector(-4, 2))
               * new Vector(-4, 2).dot(new Vector(2, -3))
               * new Vector(2, -4).dot(new Vector(-3, 2))
               *
               * @param  {Vector} vector The vector object against which to calculate the dot product
               * @return {number}        The dot product of the two vectors
               */
              dot(vector) {
                  return (this.x * vector.x) + (this.y * vector.y);
              }

              /**
               * Calculates the cross product between this and the supplied vector.
               *
               * @example
               * // returns -2
               * new Vector(2, -3).cross(new Vector(-4, 2))
               * new Vector(-4, 2).cross(new Vector(2, -3))
               * // returns 2
               * new Vector(2, -4).cross(new Vector(-3, 2))
               *
               * @param  {Vector} vector The vector object against which to calculate the cross product
               * @return {number}        The cross product of the two vectors
               */
              cross(vector) {
                  return (this.x * vector.x) - (this.y * vector.y);
              }


            /**
             * Getters and setters
             */

            /**
             * (getter/setter) The x value of the vector.
             *
             * @type {number}
             * @default 0
             */
            set x(x) {
              if(typeof x === 'number') {
                this._x = x;
              } else {
                throw new TypeError('X should be a number');
              }
            }
            get x() {
              return this._x || 0;
            }

           /**
              * (getter/setter) The y value of the vector.
              *
              * @type {number}
              * @default 0
              */
            set y(y) {
              if(typeof y === 'number') {
                this._y = y;
              } else {
                throw new TypeError('Y should be a number');
              }
            }
            get y() {
              return this._y || 0;
            }

              /**
              * (getter/setter) The length of the vector presented as a square. If you're using
              * length for comparison, this is quicker.
              *
              * @type {number}
              * @default 0
              */
            set lengthSquared(length) {
              var factor;
              if(typeof length === 'number') {
                factor = length / this.lengthSquared;
                this.multiplyScalar(factor);
              } else {
                throw new TypeError('length should be a number');
              }
            }
            get lengthSquared() {
              return (this.x * this.x) + (this.y * this.y);
            }

              /**
              * (getter/setter) The length of the vector
              *
              * @type {number}
              * @default 0
              */
            set length(length) {
              var factor;
              if(typeof length === 'number') {
                factor = length / this.length;
                this.multiplyScalar(factor);
              } else {
                throw new TypeError('length should be a number');
              }
            }
            get length() {
              return Math.sqrt(this.lengthSquared);
            }

              /**
              * (getter/setter) The angle of the vector, in radians
              *
              * @type {number}
              * @default 0
              */
            set angle(radian) {
              if(typeof radian === 'number') {
                this.rotateTo(radian);
              } else {
                throw new TypeError('angle should be a number');
              }
            }
            get angle() {
              return Math.atan2(this.y, this.x);
            }

              /**
              * (getter/setter) The angle of the vector, in radians
              *
              * @type {number}
              * @default 0
              */
            set angleInDegrees(degrees) {
              if(typeof degrees === 'number') {
                this.rotateToDeg(degrees);
              } else {
                throw new TypeError('angle should be a number');
              }
            }
            get angleInDegrees() {
              return radianToDegrees(Math.atan2(this.y, this.x));
            }

              /**
               * (getter/setter) Vector width.
             * Alias of {@link Vector#x x}
               *
               * @type {number}
               */
              set width(w) {
                  this.x = w;
              }
              get width() {
                  return this.x;
              }

              /**
               * (getter/setter) Vector height.
             * Alias of {@link Vector#x x}
               *
               * @type {number}
               */
              set height(h) {
                  this.y = h;
              }
              get height() {
                  return this.y;
              }

              /**
               * (getter/setter) Vector area.
               * @readonly
               *
               * @type {number}
               */
              get area() {
                  return this.x * this.y;
              }

          }

          initialise();
    }

    render () {
        return (
              <canvas className='drawer'></canvas>
        )
    }
}

export default Swirler