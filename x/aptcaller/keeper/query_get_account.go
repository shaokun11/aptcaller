package keeper

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"strings"

	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetAccount(goCtx context.Context, req *types.QueryGetAccountRequest) (*types.QueryGetAccountResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ctx
	addr := req.Address
	url := "https://api.devnet.aptoslabs.com/v1/accounts/" + strings.ToLower(addr)
	resp, err := http.Get(url)
	if err != nil {
		return nil, status.Error(codes.Unavailable, err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	headerString := ""
	for key, values := range resp.Header {
		for _, value := range values {
			headerString += fmt.Sprintf("%s: %s\n", key, value)
		}
	}
	return &types.QueryGetAccountResponse{
		AptRes: &types.AptRes{
			Header: headerString,
			Body:   string(body),
			Code:   uint32(resp.StatusCode),
		},
	}, nil
}
