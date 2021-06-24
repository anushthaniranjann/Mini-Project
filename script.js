! function() {
    "use strict";
    var t = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
            return e.querySelector(t)
        },
        e = function(t) { return window.getComputedStyle(t) },
        i = function(t, e) { return Math.floor(Math.random() * (e - t + 1)) + t },
        s = function(t, e) { return 4 * t + e };

    function n() {
        this.cells = function(t) { return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document).querySelectorAll(t) }(".cell"),
            this.tiles = [0, 0, 0, 0].map((function(t) { return [0, 0, 0, 0] })),
            this.merged = [0, 0, 0, 0].map((function(t) { return [0, 0, 0, 0] })),
            this.resetMerged = function() { this.merged = [0, 0, 0, 0].map((function(t) { return [0, 0, 0, 0] })) },
            this.getRandomAvailableCell = function() {
                var t = i(0, 3),
                    e = i(0, 3);
                return this.empty(t, e) ? { r: t, c: e } : !!this.tiles.some((function(t) { return t.some((function(t) { return 0 === t })) })) && this.getRandomAvailableCell()
            },
            this.empty = function(t, e) { return 0 === this.tiles[t][e] }
    }

    function l() {
        var i = this;
        this.tileMap = new n,
            this.board = t(".gameboard"),
            this.boundaries = { minX: 0, minY: 0, maxX: 3, maxY: 3 },
            this.ismoving = !1,
            this.GameOver = !1,
            this.newTilePositions = [],
            this.moved = !1,
            this.score = 0,
            this.canMove = {
                up: function(t, e) { return !(t - 1 < i.boundaries.minX) && (i.tileMap.empty(t - 1, e) || i.tileMap.tiles[t][e] === i.tileMap.tiles[t - 1][e]) },
                down: function(t, e) { return !(t + 1 > i.boundaries.maxX) && (i.tileMap.empty(t + 1, e) || i.tileMap.tiles[t][e] === i.tileMap.tiles[t + 1][e]) },
                left: function(t, e) { return !(e - 1 < i.boundaries.minY) && (i.tileMap.empty(t, e - 1) || i.tileMap.tiles[t][e] === i.tileMap.tiles[t][e - 1]) },
                right: function(t, e) { return !(e + 1 > i.boundaries.maxY) && (i.tileMap.empty(t, e + 1) || i.tileMap.tiles[t][e] === i.tileMap.tiles[t][e + 1]) }
            },
            this.setup = function() {
                var i = this,
                    s = e(this.board).width;
                t(".gameOver").style.display = "none",
                    this.board.style.height = s, [2, 2].map((function(t) { i.generateRandomTile(t) })),
                    this.updateBoard()
            },
            this.generateRandomTile = function(t) {
                var e = this.tileMap.getRandomAvailableCell();
                !1 !== e && this.generateNewTile(e, t)
            },
            this.generateNewTile = function(t, e) {
                this.tileMap.tiles[t.r][t.c] = e,
                    this.newTilePositions.push(s(t.r, t.c)),
                    this.updateBoard()
            },
            this.updateBoard = function() {
                var e = this;
                this.tileMap.tiles.map((function(t, i) {
                        t.map((function(t, n) {
                            if (0 !== t) {
                                var l = e.tileMap.cells[s(i, n)],
                                    a = s(i, n),
                                    o = ""; -
                                1 === e.newTilePositions.indexOf(a) && 1 !== e.tileMap.merged[i][n] || (o = " pop", e.newTilePositions = e.newTilePositions.filter((function(t) { return t !== a }))),
                                    l.innerHTML = '<div class="tile'.concat(o, '" data-value="').concat(t, '">').concat(t, "</div>")
                            } else e.tileMap.cells[s(i, n)].innerHTML = ""
                        }))
                    })),
                    t("#score").innerHTML = this.score
            },
            this.render = function() {
                var t = this;
                this.GameOver || (this.moved ? setTimeout((function() {
                    t.updateBoard(), setTimeout((function() {
                        t.generateRandomTile(2),
                            t.ismoving = !1,
                            t.tileMap.resetMerged(),
                            setTimeout((function() {!t.GameOver && t.isgameOver() }), 20)
                    }), 20)
                }), 100) : this.ismoving = !1)
            },
            this.isgameOver = function() {
                var t = this;
                this.GameOver = this.tileMap.tiles.map((function(e, i) { return !e.map((function(e, s) { return !!t.tileMap.empty(i, s) || (t.canMove.up(i, s) || t.canMove.down(i, s) || t.canMove.left(i, s) || t.canMove.right(i, s)) })).every((function(t) { return !1 === t })) })).every((function(t) { return !1 === t })),
                    this.GameOver && this.finish()
            },
            this.finish = function() { t(".gameOver").style.display = "flex" },
            this.moveRight = function() {
                if (!this.ismoving) {
                    var e, i, n;
                    for (this.ismoving = !0,
                        this.moved = !1, e = 0; e < 4; e++)
                        for (i = 2; i >= 0; i--) {
                            var l = 0;
                            if (!this.tileMap.empty(e, i)) {
                                var a = e,
                                    o = i,
                                    r = t(".tile", this.tileMap.cells[s(a, o)]);
                                for (n = i; n < 3; n++) this.tileMap.empty(e, n + 1) ? (this.tileMap.tiles[e][n + 1] += this.tileMap.tiles[e][n],
                                    this.tileMap.tiles[e][n] = 0, this.moved = !0, l += 1) : this.tileMap.merged[e][n] || this.tileMap.merged[e][n + 1] || this.tileMap.tiles[e][n] !== this.tileMap.tiles[e][n + 1] || (this.tileMap.tiles[e][n + 1] += this.tileMap.tiles[e][n],
                                    this.tileMap.tiles[e][n] = 0,
                                    this.tileMap.merged[e][n + 1] = 1,
                                    this.moved = !0, this.score += this.tileMap.tiles[e][n + 1], l += 1);
                                r.style.left = "calc(".concat(l, "*(10px + 100%))")
                            }
                        }
                    this.render()
                }
            }, this.moveLeft = function() {
                if (!this.ismoving) {
                    var e, i, n;
                    for (this.ismoving = !0,
                        this.moved = !1, e = 0; e < 4; e++)
                        for (i = 1; i < 4; i++) {
                            var l = 0;
                            if (!this.tileMap.empty(e, i)) {
                                var a = e,
                                    o = i,
                                    r = t(".tile", this.tileMap.cells[s(a, o)]);
                                for (n = i; n >= 1; n--) this.tileMap.empty(e, n - 1) ? (this.tileMap.tiles[e][n - 1] += this.tileMap.tiles[e][n],
                                    this.tileMap.tiles[e][n] = 0,
                                    this.moved = !0, l += 1) : this.tileMap.merged[e][n] || this.tileMap.merged[e][n - 1] || this.tileMap.tiles[e][n] !== this.tileMap.tiles[e][n - 1] || (this.tileMap.tiles[e][n - 1] += this.tileMap.tiles[e][n], this.tileMap.tiles[e][n] = 0, this.tileMap.merged[e][n - 1] = 1,
                                    this.moved = !0, this.score += this.tileMap.tiles[e][n - 1], l += 1);
                                r.style.left = "calc(".concat(-l, "*(10px + 100%))")
                            }
                        }
                    this.render()
                }
            },
            this.moveUp = function() {
                if (!this.ismoving) {
                    var e, i, n;
                    for (this.ismoving = !0, this.moved = !1, i = 0; i < 4; i++)
                        for (e = 1; e < 4; e++) {
                            var l = 0;
                            if (!this.tileMap.empty(e, i)) {
                                var a = e,
                                    o = i,
                                    r = t(".tile", this.tileMap.cells[s(a, o)]);
                                for (n = e; n >= 1; n--) this.tileMap.empty(n - 1, i) ? (this.tileMap.tiles[n - 1][i] += this.tileMap.tiles[n][i],
                                    this.tileMap.tiles[n][i] = 0, this.moved = !0, l += 1) : this.tileMap.merged[n][i] || this.tileMap.merged[n - 1][i] || this.tileMap.tiles[n][i] !== this.tileMap.tiles[n - 1][i] || (this.tileMap.tiles[n - 1][i] += this.tileMap.tiles[n][i],
                                    this.tileMap.tiles[n][i] = 0, this.tileMap.merged[n - 1][i] = 1, this.moved = !0, this.score += this.tileMap.tiles[n - 1][i], l += 1);
                                r.style.top = "calc(".concat(-l, "*(10px + 100%))")
                            }
                        }
                    this.render()
                }
            },
            this.moveDown = function() {
                if (!this.ismoving) {
                    var e, i, n;
                    for (this.ismoving = !0, this.moved = !1, i = 0; i < 4; i++)
                        for (e = 2; e >= 0; e--) {
                            var l = 0;
                            if (!this.tileMap.empty(e, i)) {
                                var a = e,
                                    o = i,
                                    r = t(".tile", this.tileMap.cells[s(a, o)]);
                                for (n = e; n < 3; n++) this.tileMap.empty(n + 1, i) ? (this.tileMap.tiles[n + 1][i] += this.tileMap.tiles[n][i],
                                    this.tileMap.tiles[n][i] = 0,
                                    this.moved = !0, l += 1) : this.tileMap.merged[n][i] || this.tileMap.merged[n + 1][i] || this.tileMap.tiles[n][i] !== this.tileMap.tiles[n + 1][i] || (this.tileMap.tiles[n + 1][i] += this.tileMap.tiles[n][i], this.tileMap.tiles[n][i] = 0, this.tileMap.merged[n + 1][i] = 1, this.moved = !0,
                                    this.score += this.tileMap.tiles[n + 1][i], l += 1);
                                r.style.top = "calc(".concat(l, "*(10px + 100%))")
                            }
                        }
                    this.render()
                }
            }
    }
    window.addEventListener("DOMContentLoaded", (function() {
        function i() {
            var t = new l;
            t.setup(),
                function(t) {
                    document.addEventListener("keyup", (function(e) {
                        if (t.GameOver) console.log("Game Over!... Try Again...");
                        else switch (e.key) {
                            case "ArrowUp":
                                t.moveUp();
                                break;
                            case "ArrowDown":
                                t.moveDown();
                                break;
                            case "ArrowRight":
                                t.moveRight();
                                break;
                            case "ArrowLeft":
                                t.moveLeft()
                        }
                    }))
                }(t),
                function(t) {
                    if (t.GameOver) console.log("Game Over!... Try Again...");
                    else {
                        var e = null,
                            i = null;
                        document.addEventListener("touchstart", (function(t) {
                            var s = t.touches[0];
                            e = s.clientX, i = s.clientY
                        }), !1), document.addEventListener("touchmove", (function(s) { if (e && i) { var n = s.touches[0].clientX,
                                    l = s.touches[0].clientY,
                                    a = e - n,
                                    o = i - l;
                                a < 30 && a > -30 && o < 30 && o > -30 || (Math.abs(a) > Math.abs(o) ? a > 0 ? t.moveLeft() : t.moveRight() : o > 0 ? t.moveUp() : t.moveDown(), e = null, i = null) } }), !1)
                    }
                }(t),
                document.addEventListener("resize", (function() { t.board.style.height = e(t.board).width }))
        }
        t("#replay").addEventListener("click", (function(t) { i() })), i()
    }))
}();