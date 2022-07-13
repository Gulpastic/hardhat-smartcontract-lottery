const { getNamedAccounts, deployments, network, ethers } = require("hardhat")

const BASE_FEE = ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9 // calculated value based on the gasPrice of the chain.

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("local network detected! Deploying mocks...")
        // deploy a mock vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        })
        log("Mocks deployed!")
        log("--------------------------------------------------------------")
        log(
            "Please run `yarn hardhat console --network localhost` to interact with the deployed smart contracts!"
        )
        log("--------------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
