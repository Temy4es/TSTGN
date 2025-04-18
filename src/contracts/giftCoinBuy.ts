import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    DictionaryValue,
    Contract, 
    ContractProvider, 
    Sender, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder
} from 'ton-core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    jettonWalletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.jettonWalletCode);
    };
}

export function loadJettonData(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _jettonWalletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

function loadTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

function loadGetterTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

function storeTupleJettonData(source: JettonData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    ownerAddress: Address;
    jettonMasterAddress: Address;
    jettonWalletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeAddress(src.jettonMasterAddress);
        b_0.storeRef(src.jettonWalletCode);
    };
}

export function loadJettonWalletData(slice: Slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _ownerAddress = sc_0.loadAddress();
    const _jettonMasterAddress = sc_0.loadAddress();
    const _jettonWalletCode = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, ownerAddress: _ownerAddress, jettonMasterAddress: _jettonMasterAddress, jettonWalletCode: _jettonWalletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _jettonMasterAddress = source.readAddress();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, ownerAddress: _ownerAddress, jettonMasterAddress: _jettonMasterAddress, jettonWalletCode: _jettonWalletCode };
}

function loadGetterTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _jettonMasterAddress = source.readAddress();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, ownerAddress: _ownerAddress, jettonMasterAddress: _jettonMasterAddress, jettonWalletCode: _jettonWalletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.ownerAddress);
    builder.writeAddress(source.jettonMasterAddress);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type MaybeAddress = {
    $$type: 'MaybeAddress';
    address: Address | null;
}

export function storeMaybeAddress(src: MaybeAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.address);
    };
}

export function loadMaybeAddress(slice: Slice) {
    const sc_0 = slice;
    const _address = sc_0.loadMaybeAddress();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

function loadTupleMaybeAddress(source: TupleReader) {
    const _address = source.readAddressOpt();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

function loadGetterTupleMaybeAddress(source: TupleReader) {
    const _address = source.readAddressOpt();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

function storeTupleMaybeAddress(source: MaybeAddress) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserMaybeAddress(): DictionaryValue<MaybeAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMaybeAddress(src)).endCell());
        },
        parse: (src) => {
            return loadMaybeAddress(src.loadRef().beginParse());
        }
    }
}

export type RecieveCoins = {
    $$type: 'RecieveCoins';
    amount: bigint;
    sender: Address;
}

export function storeRecieveCoins(src: RecieveCoins) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3713992508, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
    };
}

export function loadRecieveCoins(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3713992508) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    return { $$type: 'RecieveCoins' as const, amount: _amount, sender: _sender };
}

function loadTupleRecieveCoins(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    return { $$type: 'RecieveCoins' as const, amount: _amount, sender: _sender };
}

function loadGetterTupleRecieveCoins(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    return { $$type: 'RecieveCoins' as const, amount: _amount, sender: _sender };
}

function storeTupleRecieveCoins(source: RecieveCoins) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    return builder.build();
}

function dictValueParserRecieveCoins(): DictionaryValue<RecieveCoins> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRecieveCoins(src)).endCell());
        },
        parse: (src) => {
            return loadRecieveCoins(src.loadRef().beginParse());
        }
    }
}

export type RecieveCoinsAmount = {
    $$type: 'RecieveCoinsAmount';
    amount: bigint;
    sender: Address;
}

export function storeRecieveCoinsAmount(src: RecieveCoinsAmount) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1927533786, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
    };
}

export function loadRecieveCoinsAmount(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1927533786) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    return { $$type: 'RecieveCoinsAmount' as const, amount: _amount, sender: _sender };
}

function loadTupleRecieveCoinsAmount(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    return { $$type: 'RecieveCoinsAmount' as const, amount: _amount, sender: _sender };
}

function loadGetterTupleRecieveCoinsAmount(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    return { $$type: 'RecieveCoinsAmount' as const, amount: _amount, sender: _sender };
}

function storeTupleRecieveCoinsAmount(source: RecieveCoinsAmount) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    return builder.build();
}

function dictValueParserRecieveCoinsAmount(): DictionaryValue<RecieveCoinsAmount> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRecieveCoinsAmount(src)).endCell());
        },
        parse: (src) => {
            return loadRecieveCoinsAmount(src.loadRef().beginParse());
        }
    }
}

export type JettonUpdateContent = {
    $$type: 'JettonUpdateContent';
    queryId: bigint;
    content: Cell;
}

export function storeJettonUpdateContent(src: JettonUpdateContent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeRef(src.content);
    };
}

export function loadJettonUpdateContent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _content = sc_0.loadRef();
    return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content };
}

function loadTupleJettonUpdateContent(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _content = source.readCell();
    return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content };
}

function loadGetterTupleJettonUpdateContent(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _content = source.readCell();
    return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content };
}

function storeTupleJettonUpdateContent(source: JettonUpdateContent) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserJettonUpdateContent(): DictionaryValue<JettonUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadJettonUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferInternal = {
    $$type: 'JettonTransferInternal';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeJettonTransferInternal(src: JettonTransferInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransferInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleJettonTransferInternal(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonTransferInternal(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleJettonTransferInternal(source: JettonTransferInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserJettonTransferInternal(): DictionaryValue<JettonTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type JettonNotification = {
    $$type: 'JettonNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeJettonNotification(src: JettonNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function loadTupleJettonNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function storeTupleJettonNotification(source: JettonNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserJettonNotification(): DictionaryValue<JettonNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    queryId: bigint;
    amount: bigint;
    responseDestination: Address | null;
    customPayload: Cell | null;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonBurn(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

function loadTupleJettonBurn(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

function loadGetterTupleJettonBurn(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

function storeTupleJettonBurn(source: JettonBurn) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address | null;
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.responseDestination);
    };
}

export function loadJettonBurnNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

function loadTupleJettonBurnNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

function loadGetterTupleJettonBurnNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.responseDestination);
    return builder.build();
}

function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonExcesses = {
    $$type: 'JettonExcesses';
    queryId: bigint;
}

export function storeJettonExcesses(src: JettonExcesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadJettonExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

function loadTupleJettonExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

function loadGetterTupleJettonExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

function storeTupleJettonExcesses(source: JettonExcesses) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    queryId: bigint;
    ownerAddress: Address;
    includeAddress: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeBit(src.includeAddress);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _ownerAddress = sc_0.loadAddress();
    const _includeAddress = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.ownerAddress);
    builder.writeBoolean(source.includeAddress);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    queryId: bigint;
    walletAddress: Address;
    ownerAddress: Cell | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.walletAddress);
        if (src.ownerAddress !== null && src.ownerAddress !== undefined) { b_0.storeBit(true).storeRef(src.ownerAddress); } else { b_0.storeBit(false); }
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _walletAddress = sc_0.loadAddress();
    const _ownerAddress = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _walletAddress = source.readAddress();
    const _ownerAddress = source.readCellOpt();
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _walletAddress = source.readAddress();
    const _ownerAddress = source.readCellOpt();
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.walletAddress);
    builder.writeCell(source.ownerAddress);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    queryId: bigint;
    receiver: Address;
    tonAmount: bigint;
    mintMessage: JettonTransferInternal;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(21, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.receiver);
        b_0.storeCoins(src.tonAmount);
        const b_1 = new Builder();
        b_1.store(storeJettonTransferInternal(src.mintMessage));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMint(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 21) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _receiver = sc_0.loadAddress();
    const _tonAmount = sc_0.loadCoins();
    const sc_1 = sc_0.loadRef().beginParse();
    const _mintMessage = loadJettonTransferInternal(sc_1);
    return { $$type: 'Mint' as const, queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage };
}

function loadTupleMint(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _tonAmount = source.readBigNumber();
    const _mintMessage = loadTupleJettonTransferInternal(source);
    return { $$type: 'Mint' as const, queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage };
}

function loadGetterTupleMint(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _tonAmount = source.readBigNumber();
    const _mintMessage = loadGetterTupleJettonTransferInternal(source);
    return { $$type: 'Mint' as const, queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage };
}

function storeTupleMint(source: Mint) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.tonAmount);
    builder.writeTuple(storeTupleJettonTransferInternal(source.mintMessage));
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type CloseMinting = {
    $$type: 'CloseMinting';
}

export function storeCloseMinting(src: CloseMinting) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(22, 32);
    };
}

export function loadCloseMinting(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 22) { throw Error('Invalid prefix'); }
    return { $$type: 'CloseMinting' as const };
}

function loadTupleCloseMinting(source: TupleReader) {
    return { $$type: 'CloseMinting' as const };
}

function loadGetterTupleCloseMinting(source: TupleReader) {
    return { $$type: 'CloseMinting' as const };
}

function storeTupleCloseMinting(source: CloseMinting) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserCloseMinting(): DictionaryValue<CloseMinting> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCloseMinting(src)).endCell());
        },
        parse: (src) => {
            return loadCloseMinting(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletBalance = {
    $$type: 'ProvideWalletBalance';
    receiver: Address;
    includeVerifyInfo: boolean;
}

export function storeProvideWalletBalance(src: ProvideWalletBalance) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2059982169, 32);
        b_0.storeAddress(src.receiver);
        b_0.storeBit(src.includeVerifyInfo);
    };
}

export function loadProvideWalletBalance(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2059982169) { throw Error('Invalid prefix'); }
    const _receiver = sc_0.loadAddress();
    const _includeVerifyInfo = sc_0.loadBit();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

function loadTupleProvideWalletBalance(source: TupleReader) {
    const _receiver = source.readAddress();
    const _includeVerifyInfo = source.readBoolean();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

function loadGetterTupleProvideWalletBalance(source: TupleReader) {
    const _receiver = source.readAddress();
    const _includeVerifyInfo = source.readBoolean();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

function storeTupleProvideWalletBalance(source: ProvideWalletBalance) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    builder.writeBoolean(source.includeVerifyInfo);
    return builder.build();
}

function dictValueParserProvideWalletBalance(): DictionaryValue<ProvideWalletBalance> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletBalance(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletBalance(src.loadRef().beginParse());
        }
    }
}

export type VerifyInfo = {
    $$type: 'VerifyInfo';
    owner: Address;
    minter: Address;
    code: Cell;
}

export function storeVerifyInfo(src: VerifyInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.minter);
        b_0.storeRef(src.code);
    };
}

export function loadVerifyInfo(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _minter = sc_0.loadAddress();
    const _code = sc_0.loadRef();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

function loadTupleVerifyInfo(source: TupleReader) {
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

function loadGetterTupleVerifyInfo(source: TupleReader) {
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

function storeTupleVerifyInfo(source: VerifyInfo) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.minter);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserVerifyInfo(): DictionaryValue<VerifyInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVerifyInfo(src)).endCell());
        },
        parse: (src) => {
            return loadVerifyInfo(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletBalance = {
    $$type: 'TakeWalletBalance';
    balance: bigint;
    verifyInfo: VerifyInfo | null;
}

export function storeTakeWalletBalance(src: TakeWalletBalance) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3396861378, 32);
        b_0.storeCoins(src.balance);
        if (src.verifyInfo !== null && src.verifyInfo !== undefined) { b_0.storeBit(true); b_0.store(storeVerifyInfo(src.verifyInfo)); } else { b_0.storeBit(false); }
    };
}

export function loadTakeWalletBalance(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3396861378) { throw Error('Invalid prefix'); }
    const _balance = sc_0.loadCoins();
    const _verifyInfo = sc_0.loadBit() ? loadVerifyInfo(sc_0) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

function loadTupleTakeWalletBalance(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _verifyInfo_p = source.readTupleOpt();
    const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

function loadGetterTupleTakeWalletBalance(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _verifyInfo_p = source.readTupleOpt();
    const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

function storeTupleTakeWalletBalance(source: TakeWalletBalance) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    if (source.verifyInfo !== null && source.verifyInfo !== undefined) {
        builder.writeTuple(storeTupleVerifyInfo(source.verifyInfo));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserTakeWalletBalance(): DictionaryValue<TakeWalletBalance> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletBalance(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletBalance(src.loadRef().beginParse());
        }
    }
}

export type ClaimTON = {
    $$type: 'ClaimTON';
    receiver: Address;
}

export function storeClaimTON(src: ClaimTON) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(60010958, 32);
        b_0.storeAddress(src.receiver);
    };
}

export function loadClaimTON(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 60010958) { throw Error('Invalid prefix'); }
    const _receiver = sc_0.loadAddress();
    return { $$type: 'ClaimTON' as const, receiver: _receiver };
}

function loadTupleClaimTON(source: TupleReader) {
    const _receiver = source.readAddress();
    return { $$type: 'ClaimTON' as const, receiver: _receiver };
}

function loadGetterTupleClaimTON(source: TupleReader) {
    const _receiver = source.readAddress();
    return { $$type: 'ClaimTON' as const, receiver: _receiver };
}

function storeTupleClaimTON(source: ClaimTON) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserClaimTON(): DictionaryValue<ClaimTON> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimTON(src)).endCell());
        },
        parse: (src) => {
            return loadClaimTON(src.loadRef().beginParse());
        }
    }
}

export type UpdateJettonWallet = {
    $$type: 'UpdateJettonWallet';
    newAddress: Address;
}

export function storeUpdateJettonWallet(src: UpdateJettonWallet) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4291448911, 32);
        b_0.storeAddress(src.newAddress);
    };
}

export function loadUpdateJettonWallet(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4291448911) { throw Error('Invalid prefix'); }
    const _newAddress = sc_0.loadAddress();
    return { $$type: 'UpdateJettonWallet' as const, newAddress: _newAddress };
}

function loadTupleUpdateJettonWallet(source: TupleReader) {
    const _newAddress = source.readAddress();
    return { $$type: 'UpdateJettonWallet' as const, newAddress: _newAddress };
}

function loadGetterTupleUpdateJettonWallet(source: TupleReader) {
    const _newAddress = source.readAddress();
    return { $$type: 'UpdateJettonWallet' as const, newAddress: _newAddress };
}

function storeTupleUpdateJettonWallet(source: UpdateJettonWallet) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.newAddress);
    return builder.build();
}

function dictValueParserUpdateJettonWallet(): DictionaryValue<UpdateJettonWallet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateJettonWallet(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateJettonWallet(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type ForwardPayload = {
    $$type: 'ForwardPayload';
    opcode: bigint;
    comment: string;
}

export function storeForwardPayload(src: ForwardPayload) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.opcode, 32);
        b_0.storeStringRefTail(src.comment);
    };
}

export function loadForwardPayload(slice: Slice) {
    const sc_0 = slice;
    const _opcode = sc_0.loadUintBig(32);
    const _comment = sc_0.loadStringRefTail();
    return { $$type: 'ForwardPayload' as const, opcode: _opcode, comment: _comment };
}

function loadTupleForwardPayload(source: TupleReader) {
    const _opcode = source.readBigNumber();
    const _comment = source.readString();
    return { $$type: 'ForwardPayload' as const, opcode: _opcode, comment: _comment };
}

function loadGetterTupleForwardPayload(source: TupleReader) {
    const _opcode = source.readBigNumber();
    const _comment = source.readString();
    return { $$type: 'ForwardPayload' as const, opcode: _opcode, comment: _comment };
}

function storeTupleForwardPayload(source: ForwardPayload) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.opcode);
    builder.writeString(source.comment);
    return builder.build();
}

function dictValueParserForwardPayload(): DictionaryValue<ForwardPayload> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeForwardPayload(src)).endCell());
        },
        parse: (src) => {
            return loadForwardPayload(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferMessage = {
    $$type: 'JettonTransferMessage';
    opcode: bigint;
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}

export function storeJettonTransferMessage(src: JettonTransferMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.opcode, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeRef(src.forwardPayload);
    };
}

export function loadJettonTransferMessage(slice: Slice) {
    const sc_0 = slice;
    const _opcode = sc_0.loadUintBig(32);
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0.loadRef();
    return { $$type: 'JettonTransferMessage' as const, opcode: _opcode, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleJettonTransferMessage(source: TupleReader) {
    const _opcode = source.readBigNumber();
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'JettonTransferMessage' as const, opcode: _opcode, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonTransferMessage(source: TupleReader) {
    const _opcode = source.readBigNumber();
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'JettonTransferMessage' as const, opcode: _opcode, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleJettonTransferMessage(source: JettonTransferMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.opcode);
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserJettonTransferMessage(): DictionaryValue<JettonTransferMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferMessage(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferMessage(src.loadRef().beginParse());
        }
    }
}

export type GiftCoinBuy$Data = {
    $$type: 'GiftCoinBuy$Data';
    owner: Address;
    jetton_wallet: Address;
    rate: bigint;
    balance: bigint;
    myJettonWalletAddress: Address;
    myJettonAmount: bigint;
    jettonWalletCode: Cell;
    jettonMasterAddress: Address;
}

export function storeGiftCoinBuy$Data(src: GiftCoinBuy$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_wallet);
        b_0.storeUint(src.rate, 64);
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.myJettonWalletAddress);
        const b_1 = new Builder();
        b_1.storeCoins(src.myJettonAmount);
        b_1.storeRef(src.jettonWalletCode);
        b_1.storeAddress(src.jettonMasterAddress);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGiftCoinBuy$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _jetton_wallet = sc_0.loadAddress();
    const _rate = sc_0.loadUintBig(64);
    const _balance = sc_0.loadCoins();
    const _myJettonWalletAddress = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _myJettonAmount = sc_1.loadCoins();
    const _jettonWalletCode = sc_1.loadRef();
    const _jettonMasterAddress = sc_1.loadAddress();
    return { $$type: 'GiftCoinBuy$Data' as const, owner: _owner, jetton_wallet: _jetton_wallet, rate: _rate, balance: _balance, myJettonWalletAddress: _myJettonWalletAddress, myJettonAmount: _myJettonAmount, jettonWalletCode: _jettonWalletCode, jettonMasterAddress: _jettonMasterAddress };
}

function loadTupleGiftCoinBuy$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _jetton_wallet = source.readAddress();
    const _rate = source.readBigNumber();
    const _balance = source.readBigNumber();
    const _myJettonWalletAddress = source.readAddress();
    const _myJettonAmount = source.readBigNumber();
    const _jettonWalletCode = source.readCell();
    const _jettonMasterAddress = source.readAddress();
    return { $$type: 'GiftCoinBuy$Data' as const, owner: _owner, jetton_wallet: _jetton_wallet, rate: _rate, balance: _balance, myJettonWalletAddress: _myJettonWalletAddress, myJettonAmount: _myJettonAmount, jettonWalletCode: _jettonWalletCode, jettonMasterAddress: _jettonMasterAddress };
}

function loadGetterTupleGiftCoinBuy$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _jetton_wallet = source.readAddress();
    const _rate = source.readBigNumber();
    const _balance = source.readBigNumber();
    const _myJettonWalletAddress = source.readAddress();
    const _myJettonAmount = source.readBigNumber();
    const _jettonWalletCode = source.readCell();
    const _jettonMasterAddress = source.readAddress();
    return { $$type: 'GiftCoinBuy$Data' as const, owner: _owner, jetton_wallet: _jetton_wallet, rate: _rate, balance: _balance, myJettonWalletAddress: _myJettonWalletAddress, myJettonAmount: _myJettonAmount, jettonWalletCode: _jettonWalletCode, jettonMasterAddress: _jettonMasterAddress };
}

function storeTupleGiftCoinBuy$Data(source: GiftCoinBuy$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton_wallet);
    builder.writeNumber(source.rate);
    builder.writeNumber(source.balance);
    builder.writeAddress(source.myJettonWalletAddress);
    builder.writeNumber(source.myJettonAmount);
    builder.writeCell(source.jettonWalletCode);
    builder.writeAddress(source.jettonMasterAddress);
    return builder.build();
}

function dictValueParserGiftCoinBuy$Data(): DictionaryValue<GiftCoinBuy$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGiftCoinBuy$Data(src)).endCell());
        },
        parse: (src) => {
            return loadGiftCoinBuy$Data(src.loadRef().beginParse());
        }
    }
}

 type GiftCoinBuy_init_args = {
    $$type: 'GiftCoinBuy_init_args';
    owner: Address;
    jetton_wallet: Address;
    rate: bigint;
    jettonWalletCode: Cell;
    jettonMasterAddress: Address;
}

function initGiftCoinBuy_init_args(src: GiftCoinBuy_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_wallet);
        b_0.storeInt(src.rate, 257);
        b_0.storeRef(src.jettonWalletCode);
        const b_1 = new Builder();
        b_1.storeAddress(src.jettonMasterAddress);
        b_0.storeRef(b_1.endCell());
    };
}

async function GiftCoinBuy_init(owner: Address, jetton_wallet: Address, rate: bigint, jettonWalletCode: Cell, jettonMasterAddress: Address) {
    const __code = Cell.fromHex('b5ee9c7241023201000d6800022cff008e88f4a413f4bcf2c80bed53208e8130e1ed43d901110202710209020158030502b5b4a3bda89a1a400031c3ff481f481a67ff401f481a803a1f401a9f480602070206e206c206a2068d8311d55f481f481020203ae01a9a803a1f480602a2886600ba2aa0668e1f084a8e4a3f050812db678204e882605c5b678d9030120400022702016e060802b4a978ed44d0d200018e1ffa40fa40d33ffa00fa40d401d0fa00d4fa4030103810371036103510346c188eaafa40fa40810101d700d4d401d0fa40301514433005d155033470f842547251f8284096db3c1027441302e2db3c6c81120700022302b4ab89ed44d0d200018e1ffa40fa40d33ffa00fa40d401d0fa00d4fa4030103810371036103510346c188eaafa40fa40810101d700d4d401d0fa40301514433005d155033470f842547251f8284096db3c1027441302e2db3c6c81120b0201200a0c02b5b96c0ed44d0d200018e1ffa40fa40d33ffa00fa40d401d0fa00d4fa4030103810371036103510346c188eaafa40fa40810101d700d4d401d0fa40301514433005d155033470f842547251f8284096db3c1027441302e209e3027028d74920c21fe30012131429008670541323c855305034810101cf0001cf1601cf16ccc9705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d000ac078020d7217021d749c21f9430d31f01de8210178d4519ba8e39d33ffa00596c2113a1105710461035504403c87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed54e05f0904543108d31f218210dd5f073cbae30221821072e3d4dabae3022182100ba69751bae3022182100f8a7ea5ba15171a1c03fe313807fa00fa4059303188107810671056104510344390f842017f6ddb3c816cb7f8425290c705f2f482009e1c29c200f2f45148a0f8416f24135f035009a15270726d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010671056104510344390f842017f6ddb3c816cb7f8425290c705f2f482009e1c29c200f2f45148a0f8416f24135f035009a15270726d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010671056104518281900420000000047696674436f696e2d526563656976652d436f696e7303fe313807fa00fa4059303188107810671056104510344390f842017f6ddb3c816cb7f8425290c705f2f482009e1c29c200f2f45148a0f8416f24135f035009a15270726d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010671056044135c87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed54db3104fe8ffd313807d33ffa00fa4020d70b01c30093fa40019472d7216de201d2000191d4926d01e2fa005166161514433010575f0788107810671056104510344390f842017f6ddb3c5185a8708bb47696674436f696e4275798f823f828f842048209312d0004c85902cb1fc858cf16c901ccc9d025103543445540820afaf080061d281e200024000000004a6574746f6e5472616e7366657201fcc855508210178d45195007cb1f15cb3f5003fa0201cf1601206e95307001cb0192cf16e201fa0201cf16c92559706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0014a1f8416f24135f03f8416f24fa40fa0071d721fa00fa00301f00e06c6170f83aa15270726d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010671056044135c87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed54db3104c6e0218210ffca504fba8fcf313807fa40013110671056104510344138db3c338810781067105610454130f842017f6ddb3cc87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed54db31e0218210178d4519ba312128220042000000004a6574746f6e2077616c6c65742061646472657373207570646174656402bae3022182107362d09cba8e45313807d33ffa00fa405133433010245f0413a0105710461035504403c87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed54db31e0218210946a98b6bae30209232704de313807d33ffa00fa4020d70b01c30093fa40019472d7216de201fa005155151443303688108c107b106a1059104c103b4de0f842017f6ddb3c514ba0f8416f2421f8276f1021a15613c2009c07111307061111063f3f5f06e30d078208989680b60972fb02296eb39327c2009170e224282526003c0000000047696674436f696e2d5472616e736665722d496e7465726e616c00ca5531fa40fa0071d721fa00fa00306c6170f83a561001a012a171702c030211100250fec8553082107362d09c5005cb1f13cb3f01fa0201cf1601cf16c92904031110034edd441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00108b1089107800e28e3b09206ef2d0808100827007c8018210d53276db58cb1fcb3fc9102410394170441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb001026951029353630e206054374c87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed54db3101a0313807d33f0131c8018210aff90f5758cb1fcb3fc91068105710461035443012f84201706ddb3cc87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed54db312800a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0003b801c00001c121b0e30207f9012082f02f92c6ea88908cc571b024f5c2a6cae950bd39f5126874705e6e6db954af33c2bae30282f0e551a36d9dde3e2d12cffa776c9579561392ba9663fc8b202fbb25fdf7527e07bae3025f08f2c0822a2f3001fc37f842f8416f24135f03813a24218210042c1d80bef2f4820afaf080a18209312d00a1820081a721c200f2f425a8810a9f21c200f2f470f8286d8208989680c8c9d01046c8556082100f8a7ea55008cb1f16cb3f5004fa0258cf1601206e95307001cb0192cf16e2216eb3957f01ca00cc947032ca00e201fa0201cf16c92b03fe820a625a00717f250410246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb008d0d51da599d10dbda5b909d5e4e88149958d95a5d9959081513d38b081a5b9a5d1a585d19590812995d1d1bdb881d1c985b9cd9995c8ba08989fe1430fe142c2d2e007a64756d70282247696674436f696e4275793a20526563656976656420544f4e2c20696e69746961746564204a6574746f6e207472616e736665722e2229005046696c6520636f6e7472616374732f676966745f636f696e5f6275792e746163743a3132333a393a005e30fe143010575514c87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed5401da3010575514db3cf8427f70810082036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed543101f810575514db3cf8427ff8276f10f8416f24135f03a18209312d00a18042036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c87f01ca0055705087cf165005cf1613cb3f01fa0201cf16c858fa0213cc01cf16c901ccc9ed543100188200d2dbf8425290c705f2f4b486b97d');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initGiftCoinBuy_init_args({ $$type: 'GiftCoinBuy_init_args', owner, jetton_wallet, rate, jettonWalletCode, jettonMasterAddress })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const GiftCoinBuy_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough Toncoin` },
    38: { message: `Not enough extra currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid standard address` },
    138: { message: `Not a basechain address` },
    2719: { message: `Calculated jetton amount is zero` },
    14884: { message: `Insufficient TON amount sent` },
    27831: { message: `Only owner can call this function` },
    33191: { message: `Not enough TON left for Jettons after estimated fees and storage reserve` },
    40476: { message: `Amount must be greater than 0` },
    53979: { message: `only owner is allowed to withdraw` },
    54615: { message: `Insufficient balance` },
} as const

export const GiftCoinBuy_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Calculated jetton amount is zero": 2719,
    "Insufficient TON amount sent": 14884,
    "Only owner can call this function": 27831,
    "Not enough TON left for Jettons after estimated fees and storage reserve": 33191,
    "Amount must be greater than 0": 40476,
    "only owner is allowed to withdraw": 53979,
    "Insufficient balance": 54615,
} as const

const GiftCoinBuy_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonMasterAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MaybeAddress","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"RecieveCoins","header":3713992508,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RecieveCoinsAmount","header":1927533786,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonUpdateContent","header":4,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"includeAddress","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAddress","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Mint","header":21,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintMessage","type":{"kind":"simple","type":"JettonTransferInternal","optional":false}}]},
    {"name":"CloseMinting","header":22,"fields":[]},
    {"name":"ProvideWalletBalance","header":2059982169,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"includeVerifyInfo","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"VerifyInfo","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeWalletBalance","header":3396861378,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"verifyInfo","type":{"kind":"simple","type":"VerifyInfo","optional":true}}]},
    {"name":"ClaimTON","header":60010958,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateJettonWallet","header":4291448911,"fields":[{"name":"newAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ForwardPayload","header":null,"fields":[{"name":"opcode","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"comment","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"JettonTransferMessage","header":null,"fields":[{"name":"opcode","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"GiftCoinBuy$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"rate","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"myJettonWalletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"myJettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonMasterAddress","type":{"kind":"simple","type":"address","optional":false}}]},
]

const GiftCoinBuy_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "RecieveCoins": 3713992508,
    "RecieveCoinsAmount": 1927533786,
    "JettonUpdateContent": 4,
    "JettonTransfer": 260734629,
    "JettonTransferInternal": 395134233,
    "JettonNotification": 1935855772,
    "JettonBurn": 1499400124,
    "JettonBurnNotification": 2078119902,
    "JettonExcesses": 3576854235,
    "ProvideWalletAddress": 745978227,
    "TakeWalletAddress": 3513996288,
    "Mint": 21,
    "CloseMinting": 22,
    "ProvideWalletBalance": 2059982169,
    "TakeWalletBalance": 3396861378,
    "ClaimTON": 60010958,
    "UpdateJettonWallet": 4291448911,
    "Withdraw": 195467089,
}

const GiftCoinBuy_getters: ABIGetter[] = [
    {"name":"balance","methodId":104128,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"rate","methodId":130008,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"tracked_jetton_balance","methodId":98185,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"contract_jetton_wallet_address","methodId":96632,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"ton_balance","methodId":129095,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const GiftCoinBuy_getterMapping: { [key: string]: string } = {
    'balance': 'getBalance',
    'rate': 'getRate',
    'owner': 'getOwner',
    'tracked_jetton_balance': 'getTrackedJettonBalance',
    'contract_jetton_wallet_address': 'getContractJettonWalletAddress',
    'ton_balance': 'getTonBalance',
}

const GiftCoinBuy_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RecieveCoins"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RecieveCoinsAmount"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw all"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateJettonWallet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export const gasForBurn = 6700n;
export const gasForTransfer = 10500n;
export const minTonsForStorage = 10000000n;
export const Basechain = 0n;
export const OP_JETTON_TRANSFER = 260734629n;
export const JettonTransferGas = 50000000n;
export const TakeWalletAddressOpcode = 3513996288n;

export class GiftCoinBuy implements Contract {
    
    public static readonly MinTonForStorage = 20000000n;
    public static readonly JettonTransferGas = 50000000n;
    public static readonly MinTonFromUser = 70000000n;
    public static readonly storageReserve = 0n;
    public static readonly errors = GiftCoinBuy_errors_backward;
    public static readonly opcodes = GiftCoinBuy_opcodes;
    
    static async init(owner: Address, jetton_wallet: Address, rate: bigint, jettonWalletCode: Cell, jettonMasterAddress: Address) {
        return await GiftCoinBuy_init(owner, jetton_wallet, rate, jettonWalletCode, jettonMasterAddress);
    }
    
    static async fromInit(owner: Address, jetton_wallet: Address, rate: bigint, jettonWalletCode: Cell, jettonMasterAddress: Address) {
        const __gen_init = await GiftCoinBuy_init(owner, jetton_wallet, rate, jettonWalletCode, jettonMasterAddress);
        const address = contractAddress(0, __gen_init);
        return new GiftCoinBuy(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new GiftCoinBuy(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  GiftCoinBuy_types,
        getters: GiftCoinBuy_getters,
        receivers: GiftCoinBuy_receivers,
        errors: GiftCoinBuy_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | RecieveCoins | RecieveCoinsAmount | "withdraw all" | "withdraw safe" | Withdraw | JettonTransfer | UpdateJettonWallet | JettonTransferInternal | JettonNotification | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RecieveCoins') {
            body = beginCell().store(storeRecieveCoins(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RecieveCoinsAmount') {
            body = beginCell().store(storeRecieveCoinsAmount(message)).endCell();
        }
        if (message === "withdraw all") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "withdraw safe") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransfer') {
            body = beginCell().store(storeJettonTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateJettonWallet') {
            body = beginCell().store(storeUpdateJettonWallet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferInternal') {
            body = beginCell().store(storeJettonTransferInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonNotification') {
            body = beginCell().store(storeJettonNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('balance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getRate(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('rate', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getTrackedJettonBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('tracked_jetton_balance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getContractJettonWalletAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('contract_jetton_wallet_address', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getTonBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('ton_balance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}