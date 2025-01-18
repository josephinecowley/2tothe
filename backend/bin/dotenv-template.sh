ENV_FNAME='.env'
TEMPLATE_FNAME='.env.template'
cat "$(dirname "$0")/../$ENV_FNAME" | sed 's/=.*/=/g' > "$(dirname "$0")/../$TEMPLATE_FNAME"