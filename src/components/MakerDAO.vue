<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <!------------------------ Makerdao ------------------------>
      <el-tab-pane label="MakerDAO" name="first">
        <el-row>
          <el-button type="warning" @click="getAcountInfo">账户余额</el-button>
          <el-divider></el-divider>

          <!-- 系统信息 -->
					<el-button type="primary" @click="getSystemData">系统信息</el-button><br>
          <el-divider></el-divider>

          <!-- 创建CDP -->
          <el-input v-model="inputCdpType" placeholder="创建的CDP类型"></el-input><br>
          <el-input v-model="inputEthAmount" placeholder="抵押的eth数量"></el-input><br>
          <el-input v-model="inputDaiAmount" placeholder="生成dai数量 *必须大于1000*"></el-input><br><br>
          <el-button type="success" @click="openLockAndDraw">创建CDP</el-button></br>
          <el-divider></el-divider>

          <!-- 抵押eth借dai -->
          <el-input v-model="ldLockEthNum" placeholder="抵押的eth数量"></el-input><br>
          <el-input v-model="ldDrawDaiNum" placeholder="生成dai数量"></el-input><br><br>
          <el-button type="warning" @click="getLockAndDraw">抵押eth借dai</el-button></br>
          <el-divider></el-divider>

          <!-- 抵押eth -->
          <el-input v-model="lcLockEthNum" placeholder="抵押的eth数量"></el-input><br>
          <el-button type="success" @click="getLockCollateral">抵押eth</el-button></br>
          <el-divider></el-divider>

          <!-- 借dai -->
          <el-input v-model="ddDrawDaiNum" placeholder="生成dai数量"></el-input><br><br>
          <el-button type="primary" @click="getDrawDai">生成dai</el-button></br>
          <el-divider></el-divider>

          <!-- 还dai -->
          <el-input v-model="wdWipeDaiNum" placeholder="偿还dai数量"></el-input><br><br>
          <el-button type="info" @click="getWipeDai">偿还dai</el-button></br>
          <el-divider></el-divider>

          <!-- 偿还dai取回ETH -->
          <el-input v-model="wfWipeDaiNum" placeholder="偿还dai数量"></el-input><br><br>
          <el-input v-model="wfFreeEthNum" placeholder="取回eth数量"></el-input><br><br>
					<el-button type="success" @click="getWipeAndFree">还dai取回eth</el-button>
          <el-divider></el-divider>

          <!-- 偿还所有dai -->
					<el-button type="primary" @click="getWipeAll">偿还所有dai</el-button>

          <!-- 存储利率 -->
          <el-divider></el-divider>
					<el-button type="warning" @click="getSavingRate">利率市场</el-button>
        </el-row>

        <el-divider></el-divider>
        <div>
          <span>-- 账户信息结果 --</span></br></br>
						<span>区块高度: {{accountInfo.blockNumber}}</span></br>
						<span>地址: {{accountInfo.owner}}</span></br>
						<span>eth余额: {{accountInfo.ethBalance}} ETH</span></br>
            <span>dai余额: {{accountInfo.daiBalance}} DAI</span></br>
            <span>bat余额: {{accountInfo.batBalance}} BAT</span></br>
            <span>CIP-ID: {{accountInfo.cdpId}}</span></br>
						<span>CDP类型: ETH-A</span></br>
            <span>抵押eth: {{accountInfo.collateralAmount}} ETH</span></br>
            <span>抵押资产: {{accountInfo.collateralValue}} USD</span></br>
            <span>生成dai: {{accountInfo.debtValue}} DAI</span></br>
            <span>债务价值: {{accountInfo.collateralValue}} USD</span></br>
            <span>清算价格: {{accountInfo.liquidationPrice}} USD/ETH</span></br>
        </div>
            <el-divider></el-divider>

        <div>
          <span> -- 市场系统信息 -- </span></br></br>
						<span>dai的基准利率: {{mcdSystemData.base}}</span></br>
						<span>系统借dai上限: {{mcdSystemData.line}}</span></br>
						<span>借贷系统是否关闭: {{mcdSystemData.dead}}</span></br>
        </div>
             <el-divider></el-divider>

        <div>
          <span> -- 创建CDP --</span></br></br>
						<span>CDP-ID: {{openLockAndDraw.cdpId}}</span></br>
						<span>CDP-类型: {{openLockAndDraw.cdpType}}</span></br>
						<span>抵押eth数量: {{openLockAndDraw.lockETH}}</span></br>
            <span>生成dai数量: {{openLockAndDraw.drawDAI}}</span></br>
        </div>
             <el-divider></el-divider>

        <div>
          <span> -- 抵押ETH借DAI -- </span></br></br>
						<span>CDP-ID: {{lockAndDraw.cdpId}}</span></br>
            <span>抵押eth数量: {{lockAndDraw.lockEth}}</span></br>
            <span>生成dai数量: {{lockAndDraw.drawDai}}</span></br>
        </div>
          <el-divider></el-divider>

         <div>
          <span> -- 抵押ETH -- </span></br></br>
						<span>CDP-ID: {{lockCollateral.cdpId}}</span></br>
            <span>抵押eth数量: {{lockCollateral.lockEth}}</span></br>
        </div>
          <el-divider></el-divider>

        <div>
          <span> -- 借dai -- </span></br></br>
            <span>CDP-ID: {{drawDai.cdpId}}</span></br>
						<span>生成dai数量: {{drawDai.drawDaiNum}}</span></br>
        </div>
             <el-divider></el-divider>
        
        <div>
          <span> -- 还dai -- </span></br></br>
            <span>CDP-ID: {{wipeDai.cdpId}}</span></br>
            <span>当前dai数量: {{wipeDai.wipeDaiNum}}</span></br>
        </div>
             <el-divider></el-divider>

        <div>
          <span> -- 偿还dai取回eth -- </span></br></br>
            <span>CDP-ID: {{wipeAndFree.cdpId}}</span></br>
            <span>偿还dai数量: {{wipeAndFree.wipeDaiNum}}</span></br>
            <span>取回eth数量: {{wipeAndFree.freeEthNum}}</span></br>
        </div>
             <el-divider></el-divider>

        <div>
          <span>-- 偿还所有dai -- </span></br></br>
						<span>CDP-ID: {{wipeAll.cdpId}}</span></br>
        </div>
             <el-divider></el-divider>

        <div>
          <span>-- 利率市场 -- </span></br></br>
						<span>地址: {{mcdSaving.address}}</span></br>
						<span>存入DAI数量: {{mcdSaving.balanceOfAddress}}</span></br>
						<span>DSR中Dai总锁定: {{mcdSaving.totalDaiLocked}}</span></br>
            	<span>DAI的年化收益: {{mcdSaving.apyOfDAI}}</span></br>
        </div>
             <el-divider></el-divider>
        </br>

        <!-- response -->
        <span>------------------- Response ------------------- </span></br></br>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="调用结果: "
          v-model="textarea2"
        >
        </el-input>
      </el-tab-pane>

       <!-- Compound -->
      <el-tab-pane label="Compund" name="second">
        <el-row>
          <el-button type="primary" @click="getTokenList">token列表</el-button>
          <el-divider></el-divider>
          <el-button type="success" @click="getAddressBalance">地址余额</el-button>
          <el-divider></el-divider>
          <el-button type="info" @click="getMarketRate">市场利率</el-button>
          <el-divider></el-divider>
          <el-input v-model="erc20Token" placeholder="币名: ETH"></el-input> <br>
          <el-input v-model="ethAmount" placeholder="抵押eth数量: 1"></el-input></br><br>
          <el-button type="warning" @click="supplyETH">生成cETH</el-button><br>
          <el-divider></el-divider>
          <el-button type="warning" @click="redeemCEth">赎回所有ETH</el-button><br>
          <el-divider></el-divider>
          <el-button type="danger" @click="supplyBorrowRate">借贷利率</el-button>
          <el-divider></el-divider>
          <br>
          <el-input v-model="borrowDaiAmount" placeholder="生成cDai数量: 100"></el-input></br>
          <el-button type="primary" @click="supplyDai">生成cDai</el-button>
          <el-divider></el-divider>
          <br>
          <el-input v-model="repayDaiAmount" placeholder="赎回dai数量: 100"></el-input></br>
          <el-button type="primary" @click="redeemCDai">赎回所有dai</el-button>
        </el-row>
        <div></div>
        <el-divider></el-divider>
        <div>
          <span>-- 支持的币种 --</span></br></br>
						<span>币种数量: {{getOverview.tokenNumbers}}</span></br>
						<span>币种列表: {{getOverview.tokenList}}</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>-- 账户余额 --</span></br></br>
						<span>DAI余额: {{getBalance.DAI}}</span></br>
						<span>cETH余额: {{getBalance.cETH}}</span></br>
						<span>ETH余额: {{getBalance.ethBalance}}</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>-- 市场借贷利率 --</span></br></br>
						<span>ETH存储利率: {{getApyByToken.supplyApyETH}}</span></br>
						<span>ETH借贷利率: {{getApyByToken.borrowApyETH}}</span></br>
        </div>
         <!-- <el-divider></el-divider>
         <div>
          <span>-- 生成cETH --</span></br></br>
						<span>授权: </span></br>
        </div> -->
         <el-divider></el-divider>
        <div>
          <span>-- 币种的借贷利率 --</span></br></br>
						<span>币名: {{borrowRate.assetName}}</span></br>
						<span>数量: {{borrowRate.value}}</span></br>
						<span>借贷上限: {{borrowRate.borrorUpTo}}</span></br>
            <span>借贷利率: {{borrowRate.borrowRate}}</span></br>
            <span>流动性: {{borrowRate.liquidity}}</span></br>
            <span>系统允许借贷比例: {{borrowRate.collateralFactor}}%</span></br>
            <span>单个区块的借款利息: {{borrowRate.increasePerblock}}</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>-- 借dai --</span></br></br>
						<span>交易Hash: {{borrowExecute.txHash}}</span></br>
            <span>币种: {{borrowExecute.assetName}}</span></br>
            <span>数量: {{borrowExecute.borrowBalance}}</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>-- 还dai -- </span></br></br>
					<span>交易Hash: {{repayingBorrow.txHash}}</span></br>
            <span>币种: {{repayingBorrow.assetName}}</span></br>
            <span>数量: {{repayingBorrow.repayAmount}}</span></br>
        </div>
         <!-- <el-divider></el-divider>
        <div>
          <span>-- 抵押DAI借ETH -- </span></br></br>
          </br>
						<span>币种名字</span></br>
            <span>抵押DAI数量: {{}}</span></br>
            <span>借贷ETH数量: {{}}</span></br>
        </div> -->
         <el-divider></el-divider>
        <span>------------------- Response ------------------- </span></br></br>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="调用结果"
          v-model="textarea1"
        >
        </el-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  // el: '#app',
  // name: "MakerDAO",
  data() {
    return {
      activeName: "first",
      textarea2: "",
      textarea1: "",

      // MakerDAO
      accountInfo: {},
      mcdSystemData: {},
      createVault: {},
      inputCdpType: "",
      inputEthAmount: "",
      inputDaiAmount: "",
      ldLockEthNum: "",
      ldDrawDaiNum: "",
      lockAndDraw: {},

      lcLockEthNum: "",
      lockCollateral: {},
      ddDrawDaiNum: "",
      drawDai: {},
      wdWipeDaiNum: "",
      wipeDai: {},
      wfWipeDaiNum: "",
      wfFreeEthNum: "",
      wipeAndFree: {},
      wipeAll: {},
      mcdSaving: {},

      // compound
      getOverview: {},
      getBalance: {},
      getApyByToken: {},
      borrowERC20ByETH: {},
      erc20Token: "",
      ethAmount: "",
      borrowRate: {},
      borrowExecute: {},
      borrowDaiAmount: "",
      repayDaiAmount: "",
      repayingBorrow: {},
      borrowETHWithERC20: {},
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // MakerDAO
    getAcountInfo() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/accountInfo")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.accountInfo = response.data.data;
          }
        });
    },
    getSystemData() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/mcdSystemData")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.mcdSystemData = response.data.data;
          }
        });
    },

    openLockAndDraw() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/openLockAndDraw", {
          params: {
            inputCdpType: _this.inputCdpType,
            inputEthAmount: _this.inputEthAmount,
            inputDaiAmount: _this.inputDaiAmount,
          },
        })
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.createVault = response.data.data;
          }
        });
    },

    getLockAndDraw() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/lockAndDraw", {
          params: {
            ldLockEthNum: _this.ldLockEthNum,
            ldDrawDaiNum: _this.ldDrawDaiNum,
          },
        })
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.lockAndDraw = response.data.data;
          }
        });
    },

    getLockCollateral() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/lockCollateral", {
          params: {
            lcLockEthNum: _this.lcLockEthNum,
          },
        })
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.lockCollateral = response.data.data;
          }
        });
    },

    getDrawDai() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/drawDai", {
          params: {
            ddDrawDaiNum: _this.ddDrawDaiNum,
          },
        })
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.drawDai = response.data.data;
          }
        });
    },

    getWipeDai() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/wipeDai", {
          params: {
            wdWipeDaiNum: _this.wdWipeDaiNum,
          },
        })
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.wipeDai = response.data.data;
          }
        });
    },

    getWipeAndFree() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/wipeAndFree", {
          params: {
            wfWipeDaiNum: _this.wfWipeDaiNum,
            wfFreeEthNum: _this.freeEthNum,
          },
        })
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.wipeAndFree = response.data.data;
          }
        });
    },

    getWipeAll() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/wipeAll")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.wipeAll = response.data.data;
          }
        });
    },

    getSavingRate() {
      var _this = this;
      _this.textarea2 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/makerdao/mcdSaving")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
            _this.mcdSaving = response.data.data;
          }
        });
    },

    // Compound
    getTokenList() {
      var _this = this;
      _this.textarea1 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/compound/getOverview")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea1 = JSON.stringify(response.data.data);
            _this.getOverview = response.data.data;
          }
        });
    },
    getAddressBalance() {
      var _this = this;
      _this.textarea1 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/compound/getBalance")
        .then(function (response) {
          if (response.data.status === 200) {
            // _this.textarea1 = JSON.stringify(response.data.data);
            _this.getBalance = response.data.data;
          }
        });
    },
    getMarketRate() {
      var _this = this;
      _this.textarea1 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/compound/getApyByToken")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
          _this.getApyByToken = response.data.data;
        });
    },

    supplyETH() {
      var _this = this;
      _this.textarea1 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/compound/supplyETH", {
          params: {
            tokenName: _this.erc20Token,
            ethAmount: _this.ethAmount,
          },
        })
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
          _this.borrowERC20ByETH = response.data.data;
        });
    },

    redeemCEth() {
      var _this = this;
      _this.textarea1 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/compound/redeemCEth", {
          params: {
            tokenName: _this.erc20Token,
            ethAmount: _this.ethAmount,
          },
        })
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
          _this.borrowERC20ByETH = response.data.data;
        });
    },

    supplyBorrowRate() {
      var _this = this;
      _this.textarea1 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/compound/borrowRate")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
          _this.borrowRate = response.data.data;
        });
    },

    borrowDai() {
      var _this = this;
      _this.textarea1 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/compound/borrowExecute", {
          params: {
            borrowDaiAmount: _this.borrowDaiAmount,
          },
        })
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
          _this.borrowExecute = response.data.data;
        });
    },

    repayBorrow() {
      var _this = this;
      _this.textarea1 = "";
      this.$http
        .get("http://127.0.0.1:7001/api/compound/repayingBorrow", {
          params: {
            repayDaiAmount: _this.repayDaiAmount,
          },
        })
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
          _this.borrowExecute = response.data.data;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
