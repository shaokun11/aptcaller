package apt

var Url = "https://api.testnet.aptoslabs.com/v1"
var IndexerUrl = "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql"
var SupportChain = map[string]string{
	"apt1": Url,
	"apt2": Url,
	"evm1": Url,
	"evm2": Url,
}
