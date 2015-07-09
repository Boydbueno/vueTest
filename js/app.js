var Vue = require('Vue');

var things = new Vue({

    el: '#records',

    ready: function() {
        this.fetchFilters();
        this.fetchRecords();
    },

    data: {
        sortField: 'title',
        isSortingVisible: true,
        isFilterVisible: true,
        searchTerm: '',
        filters: [],
        records: []
    },

    methods: {
        sortBy: function(sortField) {
            this.sortField = sortField;
        },

        fetchFilters: function() {
            this.fetch('/filters.json', data => {
                this.filters = data;
            });
        },

        fetchRecords: function() {
            this.fetch('/records.json', data => {
                 this.records = data;
            });
        },

        fetch: function(url, callback) {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    callback(JSON.parse(request.responseText));
                }
            };

            request.send();
        }
    },

    filters: {
        filterOnQuality: function(records) {
            var anyFiltersActive = false;

            // Check if any filters are active
            this.filters.forEach(function(filter) {
                if (filter.active) {
                    anyFiltersActive = true;
                }
            });

            if (!anyFiltersActive) return records;

            return records.filter((record) => {
                // Get all 'properties' from current thing
                var qualities = record.qualities;

                // Get all filter objects that are relevant for this thing
                let filters = this.filters.filter(function(filter) {
                    return qualities.indexOf(filter.key) >= 0;
                });

                // Check if any of this
                var hasActiveFilter = false;
                filters.forEach(function(filter) {
                    if (filter.active) {
                        hasActiveFilter = true;
                    }
                });

                return hasActiveFilter;
            });
        }
    }

});
