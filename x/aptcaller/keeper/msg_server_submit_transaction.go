package keeper

import (
	"context"

	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SubmitTransaction(goCtx context.Context, msg *types.MsgSubmitTransaction) (*types.MsgSubmitTransactionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx
	k.SaveTx(ctx, types.AptTx{
		Creator: msg.Creator,
		AptTx:   msg.Body,
		Id:      0,
	})
	return &types.MsgSubmitTransactionResponse{}, nil
}
