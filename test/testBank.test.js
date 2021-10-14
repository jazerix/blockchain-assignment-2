const Bank = artifacts.require('Bank')

contract('Bank', (accounts) => {

    let bank;
    const amountToDeposit = 25;
    const amountToWithdraw = 10;

    before(async () => {
        bank = await Bank.deployed();
    });

    describe("depositing and withdrawing money", async() => {

        before(`deposit ${amountToDeposit} TNC to the first account`, async () => {
            await bank.deposit(amountToDeposit, { from: accounts[0] });
        });

        it(`can get balance in TNC`, async () => {
            const balance = (await bank.getAccount({ from: accounts[0] })).toNumber();
            assert.equal(balance, amountToDeposit, `The account balance should be ${amountToDeposit} TNC.`)
        })

        it(`can withdraw ${amountToWithdraw} TNC`, async () => {
            await bank.withdraw(amountToWithdraw, {from: accounts[0]});
            const balance = (await bank.getAccount({ from: accounts[0] })).toNumber();
            assert.equal(balance, amountToDeposit - amountToWithdraw, `The account balance should be ${amountToDeposit - amountToWithdraw} TNC.`)
        })

        it(`cannot withdraw more than current balance`, async () => {
            let fails = false;
            try
            {
                await bank.withdraw(amountToDeposit + 1, {from: accounts[0]})
            }
            catch
            {
                fails = true;
            }
            assert.equal(fails, true);
        })

        it(`cannot deposit negative amount`, async () => {
            let fails = false;
            try
            {
                await bank.deposit(-1, {from: accounts[0]})
            }
            catch
            {
                fails = true;
            }
            assert.equal(fails, true);
        })

    })
});