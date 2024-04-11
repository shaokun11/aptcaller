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

func (k Keeper) GetTransactions(goCtx context.Context, req *types.QueryGetTransactionsRequest) (*types.QueryGetTransactionsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	chainUrl, err := apt.ParseChain(req.Header)
	if err != nil {
		return nil, status.Error(codes.Internal, "parse chain error")
	}
	baseURL := fmt.Sprintf("%s/transactions ", chainUrl)
	urlObj, _ := url.Parse(baseURL)
	params := url.Values{}
	if apt.IsValidQueryStringNum(req.Limit) {
		params.Add("limit", req.Limit)
	}
	if apt.IsValidQueryStringNum(req.Start) {
		params.Add("start", req.Start)
	}
	urlObj.RawQuery = params.Encode()
	finalURL := urlObj.String()
	res, err := apt.Call(finalURL, req.Header)
	ret := types.QueryGetTransactionsResponse(*res)
	return &ret, err
}
