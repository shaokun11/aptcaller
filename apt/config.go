package apt

var Url = "https://api.testnet.aptoslabs.com/v1"
var IndexerUrl = "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql"

var HeaderBcs = "application/x.aptos.signed_transaction+bcs"
var HeaderJson = "application/json"

var HeaderJsonAll = map[string]string{
	"Content-Type": "application/json",
	"Accept":       "application/json",
}
