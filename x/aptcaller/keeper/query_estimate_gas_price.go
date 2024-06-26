package keeper

import (
	"context"
	"fmt"
	"net/url"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) EstimateGasPrice(goCtx context.Context, req *types.QueryEstimateGasPriceRequest) (*types.QueryEstimateGasPriceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	chainUrl, err := apt.ParseChain(req.Header)
	if err != nil {
		return nil, err
	}
	baseURL := fmt.Sprintf("%s/estimate_gas_price", chainUrl)
	urlObj, _ := url.Parse(baseURL)
	finalURL := urlObj.String()
	res, err := apt.Call(finalURL, req.Header)
	ret := types.QueryEstimateGasPriceResponse(*res)
	return &ret, err

}
