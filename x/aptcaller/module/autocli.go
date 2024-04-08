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
				// this line is used by ignite scaffolding # autocli/tx
			},
		},
	}
}
