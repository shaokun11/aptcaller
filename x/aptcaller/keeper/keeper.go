package keeper

import (
	"encoding/binary"
	"fmt"

	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"cosmossdk.io/store/prefix"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/runtime"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"aptcaller/x/aptcaller/types"
)

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority string
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,

) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	return Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		logger:       logger,
	}
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetTxCount(ctx sdk.Context) uint64 {
	storeAdapter := runtime.KVStoreAdapter(k.storeService.OpenKVStore(ctx))
	store := prefix.NewStore(storeAdapter, []byte{})
	byteKey := types.KeyPrefix(types.TransactionCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return binary.BigEndian.Uint64(bz)
}

func (k Keeper) GetTx(ctx sdk.Context, id uint64) types.AptTx {
	storeAdapter := runtime.KVStoreAdapter(k.storeService.OpenKVStore(ctx))
	store := prefix.NewStore(storeAdapter, []byte{})
	byteDataKey := types.KeyPrefix(fmt.Sprintf("%s/%d", types.TransactionKey, id))
	bz := store.Get(byteDataKey)
	if bz == nil {
		return types.AptTx{}
	}
	var data types.AptTx
	k.cdc.MustUnmarshal(bz, &data)
	return data

}

func (k Keeper) SaveTx(ctx sdk.Context, data types.AptTx) {
	txCount := k.GetTxCount(ctx) + 1
	// update tx count
	storeAdapter := runtime.KVStoreAdapter(k.storeService.OpenKVStore(ctx))
	store := prefix.NewStore(storeAdapter, []byte{})
	byteKey := types.KeyPrefix(types.TransactionCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, txCount)
	store.Set(byteKey, bz)

	// update tx data
	data.Id = txCount
	storeData := prefix.NewStore(storeAdapter, []byte{})
	appendedValue := k.cdc.MustMarshal(&data)
	byteDataKey := types.KeyPrefix(fmt.Sprintf("%s/%d", types.TransactionKey, txCount))
	storeData.Set(byteDataKey, appendedValue)
}
