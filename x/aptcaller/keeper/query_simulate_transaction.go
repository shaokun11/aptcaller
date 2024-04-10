package keeper

import (
	"context"
	"encoding/hex"
	"fmt"
	"net/url"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SimulateTransaction(goCtx context.Context, req *types.QuerySimulateTransactionRequest) (*types.QuerySimulateTransactionResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	baseURL := fmt.Sprintf("%s/transactions/simulate", apt.Url)

	urlObj, _ := url.Parse(baseURL)
	params := url.Values{}
	if req.GasUnitPrice > 0 {
		params.Add("estimate_gas_unit_price", "true")
	}
	if req.MaxGasAmount > 0 {
		params.Add("estimate_max_gas_amount", "true")
	}
	if req.PrioritizedGasUnitPrice > 0 {
		params.Add("estimate_prioritized_gas_unit_price", "true")
	}
	urlObj.RawQuery = params.Encode()
	finalURL := urlObj.String()
	bs, err := hex.DecodeString(req.Body)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "parse body error")
	}
	header, err := apt.ParseHeader(req.Header)
	if err != nil {
		return nil, err
	}
	res, err := apt.Post(finalURL, string(bs), header)
	ret := types.QuerySimulateTransactionResponse(*res)
	return &ret, err
}
