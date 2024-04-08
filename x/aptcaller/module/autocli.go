package aptcaller

import (
	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"

	modulev1 "aptcaller/api/aptcaller/aptcaller"
)

// AutoCLIOptions implements the autocli.HasAutoCLIConfig interface.
func (am AppModule) AutoCLIOptions() *autocliv1.ModuleOptions {
	return &autocliv1.ModuleOptions{
		Query: &autocliv1.ServiceCommandDescriptor{
			Service: modulev1.Query_ServiceDesc.ServiceName,
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "Params",
					Use:       "params",
					Short:     "Shows the parameters of the module",
				},
				{
					RpcMethod:      "GetAccount",
					Use:            "get-account [address]",
					Short:          "Query get-account",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "address"}},
				},

				{
					RpcMethod:      "GetAccountResources",
					Use:            "get-account-resources [address] [ledger-version] [limit] [start]",
					Short:          "Query get-account-resources",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "address"}, {ProtoField: "ledgerVersion"}, {ProtoField: "limit"}, {ProtoField: "start"}},
				},

				{
					RpcMethod:      "GetAccountModules",
					Use:            "get-account-modules [address] [ledger-version] [limit] [start]",
					Short:          "Query get-account-modules",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "address"}, {ProtoField: "ledgerVersion"}, {ProtoField: "limit"}, {ProtoField: "start"}},
				},

				{
					RpcMethod:      "GetAccountResource",
					Use:            "get-account-resource [address] [resource-type]",
					Short:          "Query get-account-resource",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "address"}, {ProtoField: "resourceType"}},
				},

				{
					RpcMethod:      "GetAccountModule",
					Use:            "get-account-module [address] [module-name] [ledger-version]",
					Short:          "Query get-account-module",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "address"}, {ProtoField: "moduleName"}, {ProtoField: "ledgerVersion"}},
				},

				{
					RpcMethod:      "GetBlockByHeight",
					Use:            "get-block-by-height [block-height]",
					Short:          "Query get-block-by-height",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "blockHeight"}},
				},

				{
					RpcMethod:      "GetBlockByVersion",
					Use:            "get-block-by-version [version] [with-transactions]",
					Short:          "Query get-block-by-version",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "version"}, {ProtoField: "withTransactions"}},
				},

				{
					RpcMethod:      "GetEventsByCreationNumber",
					Use:            "get-events-by-creation-number [address] [creation-number] [limit] [start]",
					Short:          "Query get-events-by-creation-number",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "address"}, {ProtoField: "creationNumber"}, {ProtoField: "limit"}, {ProtoField: "start"}},
				},

				{
					RpcMethod:      "GetEventsByEventHandle",
					Use:            "get-events-by-event-handle [address] [event-handle] [field-name] [limit] [start]",
					Short:          "Query get-events-by-event-handle",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "address"}, {ProtoField: "eventHandle"}, {ProtoField: "fieldName"}, {ProtoField: "limit"}, {ProtoField: "start"}},
				},

				{
					RpcMethod:      "GetLedgerInfo",
					Use:            "get-ledger-info",
					Short:          "Query get-ledger-info",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{},
				},

				{
					RpcMethod:      "GetTransactions",
					Use:            "get-transactions [limit] [start]",
					Short:          "Query get-transactions",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "limit"}, {ProtoField: "start"}},
				},

				{
					RpcMethod:      "GetTransactionByHash",
					Use:            "get-transaction-by-hash [txn-hash]",
					Short:          "Query get-transaction-by-hash",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "txnHash"}},
				},

				{
					RpcMethod:      "GetWaitTransactionByHash",
					Use:            "get-wait-transaction-by-hash [txn-hash]",
					Short:          "Query get-wait-transaction-by-hash",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "txnHash"}},
				},

				{
					RpcMethod:      "GetTransactionByVersion",
					Use:            "get-transaction-by-version [txn-version]",
					Short:          "Query get-transaction-by-version",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "txnVersion"}},
				},

				{
					RpcMethod:      "GetAccountTransaction",
					Use:            "get-account-transaction [address] [limit] [start]",
					Short:          "Query get-account-transaction",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "address"}, {ProtoField: "limit"}, {ProtoField: "start"}},
				},

				{
					RpcMethod:      "EstimateGasPrice",
					Use:            "estimate-gas-price",
					Short:          "Query estimate_gas_price",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{},
				},

				{
					RpcMethod:      "SubmitBatchTransaction",
					Use:            "submit-batch-transaction [body]",
					Short:          "Query submit-batch-transaction",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "body"}},
				},

				{
					RpcMethod:      "SimulateTransaction",
					Use:            "simulate-transaction [body]",
					Short:          "Query simulate-transaction",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "body"}},
				},

				{
					RpcMethod:      "EncodeSubmission",
					Use:            "encode-submission [body]",
					Short:          "Query encode-submission",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "body"}},
				},

				{
					RpcMethod:      "GetTransactionByCount",
					Use:            "get-transaction-by-count [count]",
					Short:          "Query get-transaction-by-count",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "count"}},
				},

				// this line is used by ignite scaffolding # autocli/query
			},
		},
		Tx: &autocliv1.ServiceCommandDescriptor{
			Service:              modulev1.Msg_ServiceDesc.ServiceName,
			EnhanceCustomCommand: true, // only required if you want to use the custom command
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "UpdateParams",
					Skip:      true, // skipped because authority gated
				},
				{
					RpcMethod:      "SubmitTransaction",
					Use:            "submit-transaction [body]",
					Short:          "Send a submit-transaction tx",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "body"}},
				},
				// this line is used by ignite scaffolding # autocli/tx
			},
		},
	}
}
