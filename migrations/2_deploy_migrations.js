const Store = artifacts.require('Store')
module.exports = async (deployer) => {
  const [_feeAccount] = await web3.eth.getAccounts()
  const _name = 'Angry Nerdz E-commerce'
  const _feePercent = 10
  await deployer.deploy(
    Store,
    _name,
    _feeAccount,
    _feePercent
  )
}