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

func (k Keeper) ViewFunction(goCtx context.Context, req *types.QueryViewFunctionRequest) (*types.QueryViewFunctionResponse, error) {
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
	baseURL := fmt.Sprintf("%s/view", chainUrl)
	urlObj, _ := url.Parse(baseURL)
	params := url.Values{}
	if apt.IsValidQueryStringNum(req.LedgerVersion) {
		params.Add("ledger_version", req.LedgerVersion)
	}
	urlObj.RawQuery = params.Encode()
	finalURL := urlObj.String()
	res, err := apt.Post(finalURL, req.Body, req.Header)
	ret := types.QueryViewFunctionResponse(*res)
	return &ret, err
}
