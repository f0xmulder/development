from django.contrib.postgres.search import SearchQuery
from django.db.models import Q


# Based on https://www.thetopsites.net/article/50571311.shtml
# Allows for prefix matching and searches each word individually
class PrefixedPhraseQuery(SearchQuery):

    def quote_lexeme(self, value):
        # This is not sql escaping, we are quoting a lexeme which will be embedded into a string.
        # See https://www.postgresql.org/docs/current/datatype-textsearch.html#DATATYPE-TSVECTOR
        # The string itself will be passed as a parameter and escaped by the database.
        return "'" + value.replace("'", "''").replace('\\', '\\\\').replace('%', '%%') + "'"

    # Alter the tsquery executed by SearchQuery
    def as_sql(self, compiler, connection):
        params = ["{}:*".format(self.quote_lexeme(self.value))]

        # The to_tsquery will apply processing (split query into separate lexemes, stemming,
        # removing common words, etc), even though the argument is already a tsquery itself. It
        # retains the :* modifier on every resulting lexeme.
        if self.config:
            config_sql, config_params = compiler.compile(self.config)
            template = "to_tsquery({}::regconfig, %s)".format(config_sql)
            params = config_params + params
        else:
            template = 'to_tsquery(%s)'

        if self.invert:
            template = '!!({})'.format(template)

        return template, params


def get_facet_filters(facet_inputs):
    return {
        facet: Q(**{f'{facet}__in': selected_values})
        for facet, selected_values in facet_inputs.items()
        if selected_values
    }


def get_search_filter(search_text):
    if search_text:
        return Q(searchable=PrefixedPhraseQuery(search_text, config='dutch'))
    return Q()
