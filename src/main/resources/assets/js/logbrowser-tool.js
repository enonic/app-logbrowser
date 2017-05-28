(function ($, svcUrl) {
    "use strict";

    var $ltScreen, $loadingCursor;
    var g_linesHeight = 0, g_currentLines = [];

    $(function () {
        $ltScreen = $('.lt-screen');
        $loadingCursor = $('.cursor-blink');

        g_linesHeight = getScreenHeight();

        $ltScreen.empty();
        window.addEventListener('resize', debounce(
            function () {
                g_linesHeight = getScreenHeight();
                currentPage();
            }, 500)
        );

        fetchLines(g_linesHeight, 0, 'forward');
        $('#upBut').on('click', pageUpClick);
        $('#downBut').on('click', pageDownClick);
        $('#startBut').on('click', startClick);
        $('#endBut').on('click', endClick);

        $(document).keydown(function (e) {
            if (e.keyCode === 34) {
                console.log('Page down');
                nextPage();

            } else if (e.keyCode === 33) {
                console.log('Page up');
                previousPage();

            } else if (e.keyCode === 40) {
                console.log('Arrow down');
                nextLine();

            } else if (e.keyCode === 38) {
                console.log('Arrow up');
                previousLine();

            } else if (e.keyCode === 36) {
                console.log('Init');
                firstPage();

            } else if (e.keyCode === 35) {
                console.log('End');
                lastPage();

            } else if (e.keyCode === 70 && e.shiftKey) {
                console.log('F');
            }
        });

        $('#position-slider').on("change",
            debounce(
                function () {
                    var value = $(this).val();
                    console.log(value);
                    seekPosition(value);
                }, 500));

        var ltScreenEl = $ltScreen.get(0);
        if (ltScreenEl.addEventListener) {
            ltScreenEl.addEventListener("mousewheel", onMouseWheel, false); // IE9, Chrome, Safari, Opera
            ltScreenEl.addEventListener("DOMMouseScroll", onMouseWheel, false); // Firefox
        }
    });

    var onMouseWheel = function (e) {
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta > 0) {
            previousLine();
        } else if (delta < 0) {
            nextLine();
        }
        return false;
    };

    var pageUpClick = function (e) {
        console.log('up');
        $(this).blur();

        previousPage();
    };

    var pageDownClick = function (e) {
        console.log('down');
        $(this).blur();

        nextPage();
    };

    var startClick = function (e) {
        console.log('start');
        $(this).blur();

        firstPage();
    };

    var endClick = function (e) {
        console.log('end');
        $(this).blur();

        lastPage();
    };

    var previousPage = function () {
        if (isTopPosition()) {
            return;
        }

        var firstLine, fromPos, action;
        if (g_currentLines.length === 0) {
            fromPos = 0;
        } else {
            firstLine = g_currentLines[0];
            fromPos = firstLine.start - 1;
        }
        action = fromPos <= 0 ? 'forward' : 'backward';
        fetchLines(g_linesHeight, fromPos, action);
    };

    var nextPage = function () {
        var lastLine, fromPos;
        if (g_currentLines.length === 0) {
            fromPos = 0;
        } else {
            lastLine = g_currentLines.slice(-1)[0];
            fromPos = lastLine.end + 1;
        }

        fetchLines(g_linesHeight, fromPos, 'forward');
    };

    var nextLine = function () {
        var firstLine, fromPos;
        if (g_currentLines.length === 0) {
            fromPos = 0;
        } else {
            firstLine = g_currentLines[0];
            fromPos = firstLine.end + 1;
        }

        fetchLines(g_linesHeight, fromPos, 'forward');
    };

    var previousLine = function () {
        if (isTopPosition()) {
            return;
        }

        var lastLine, fromPos, action;
        if (g_currentLines.length === 0) {
            fromPos = 0;
        } else {
            lastLine = g_currentLines.slice(-1)[0];
            fromPos = lastLine.start - 1;
        }
        action = fromPos <= 0 ? 'forward' : 'backward';
        fetchLines(g_linesHeight, fromPos, action);
    };

    var currentPage = function () {
        var firstLine, fromPos;
        if (g_currentLines.length === 0) {
            fromPos = 0;
        } else {
            firstLine = g_currentLines[0];
            fromPos = firstLine.start;
        }
        fetchLines(g_linesHeight, fromPos, 'forward');
    };

    var firstPage = function () {
        fetchLines(g_linesHeight, 0, 'forward');
    };

    var lastPage = function () {
        fetchLines(g_linesHeight, -1, 'end');
    };

    var seekPosition = function (position) {
        fetchLines(g_linesHeight, position, 'seek');
    };

    var isTopPosition = function () {
        var l = g_currentLines.length;
        if (l === 0) {
            return true;
        }
        return g_currentLines[0].start === 0;
    };
    var getScreenHeight = function () {
        var sh = $ltScreen.outerHeight(true) - 10;
        var lh = $('.lt-logline').first().outerHeight(true);
        var res = Math.floor(sh / lh);
        console.log(sh + ' / ' + lh + ' = ' + res);
        return res;
    };

    var fetchLines = function (lineCount, fromPos, action) {
        // $ltScreen.toggleClass('lt-updating', true);
        $loadingCursor.css('visibility', 'visible');
        $.ajax({
            url: svcUrl,
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                lineCount: lineCount,
                from: fromPos,
                action: action
            }
        }).done(function (resp) {
            console.log(resp);
            g_currentLines = resp.lines || [];
            showLines(g_currentLines);
            var offset = resp.lines.length === 0 ? 0 : resp.lines[0].start;
            var position = resp.size === 0 ? 0 : Math.round((offset / resp.size) * 1000);
            $('#position-slider').val(position);
            // $ltScreen.toggleClass('lt-updating', false);
            $loadingCursor.css('visibility', 'hidden');

        }).fail(function (jqXHR, textStatus) {
            // TODO
            // $ltScreen.toggleClass('lt-updating', false);
            $loadingCursor.css('visibility', 'hidden');
        });
    };

    var showLines = function (lines) {
        var lineEl, i, linesEl = [], l = lines.length;
        for (i = 0; i < l; i++) {
            lineEl = $('<span/>').addClass('lt-logline').text(lines[i].value);
            linesEl.push(lineEl);
        }
        $ltScreen.empty().append(linesEl);
        setTimeout(removeOverflownRows, 0);
    };

    var debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    };

    var removeOverflownRows = function () {
        var rows = $ltScreen.children(), r, l = rows.length, row;
        if (l <= 1) {
            return;
        }
        var clientHeight = window.innerHeight || document.documentElement.clientHeight;
        var clientWidth = window.innerWidth || document.documentElement.clientWidth;
        for (r = l - 1; r >= 0; r--) {
            row = rows[r];
            var rect = row.getBoundingClientRect();
            var isRowVisible = rect.bottom <= clientHeight && rect.right <= clientWidth;
            if (isRowVisible) {
                break;
            }
            rows[r].remove();
            g_currentLines.pop();
        }
    };

}($, SVC_URL));
