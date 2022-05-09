jQuery.fn.liveUpdate = function (list) {
    list = jQuery(list);

    if (list.length) {
        var rows = list.children('a'),
        cache = rows.map(function () {
            rowText = jQuery(this).text().toLowerCase();
            return rowText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        });

        this.keyup(filter).keyup().parents('form').submit(function () {
            return false;
        });
    }

    return this;

    function filter()
    {
        value = jQuery(this).val().toLowerCase();
        var term = jQuery.trim(value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")), scores = [];

        if (!term) {
            rows.show();
        } else {
            rows.hide();

            cache.each(function (i) {
                var score = this.score(term);
                if (score > 0) {
                    scores.push([score, i]);
                }
            });

            jQuery.each(
                scores.sort(function (a, b) {
                    return b[0] - a[0];
                }),
                function () {
                    jQuery(rows[ this[1] ]).show();
                }
            );
        }
    }
};
