var Vue = require('Vue');

var things = new Vue({

    el: '#things',

    data: {
        sortField: 'title',
        filters: [
            {
                key: 'register',
                label: 'Apotheker in Specialistenregister voor Openbaar Apothekers',
                active: false
            },
            {
                key: 'spreekkamer',
                label: 'Spreekkamer',
                active: false
            },
            {
                key: 'patientervaring',
                label: 'Recent onderzoek patiëntervaring',
                active: false
            },
            {
                key: 'cmr',
                label: 'Medicatie-incidenten registratie (CMR)',
                active: false
            },
            {
                key: 'anwdienst',
                label: 'Deelname lokale dan wel regionale avond-, nacht- en weekenddienst',
                active: false
            },
            {
                key: 'fto',
                label: 'Deelname structureel overleg met voorschrijvers',
                active: false
            },
            {
                key: 'hkz',
                label: 'HKZ- certificaat',
                active: false
            },
            {
                key: 'klachtenregeling',
                label: 'Klachtenregeling',
                active: false
            }
        ],
        things: [
            {
                title: "Apotheek St. Rijndam revalidatie-centrum",
                distance: 12,
                itHas: []
            },
            {
                title: "Medsen Oog Apotheek",
                distance: 2,
                itHas: ['register', 'spreekkamer', 'patientervaring', 'cmr', 'anwdienst', 'fto', 'hkz', 'klachtenregeling']
            },
            {
                title: "BENU Wester Apotheek",
                distance: 8,
                itHas: ['register', 'spreekkamer', 'patientervaring', 'fto', 'hkz', 'klachtenregeling']
            },
            {
                title: "Erasmus Apotheek",
                distance: 4,
                itHas: ['patientervaring', 'cmr', 'anwdienst', 'fto', 'hkz', 'klachtenregeling']
            },
            {
                title: "Ramleh Apotheek",
                distance: 22,
                itHas: ['register']
            }
        ]
    },

    methods: {
        sortBy: function(sortField) {
            this.sortField = sortField;
        }
    },

    filters: {
        itHas: function(things) {

            var anyFiltersActive = false;

            this.filters.forEach(function(filter) {
                if (filter.active) {
                    anyFiltersActive = true;
                }
            });

            if (!anyFiltersActive) return things;

            return things.filter((thing) => {
                // Get all 'properties' from current thing
                var itHas = thing.itHas;

                // Get all filter objects that are relevant for this thing
                let filters = this.filters.filter(function(filter) {
                    return itHas.indexOf(filter.key) >= 0;
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
