const genExpDist = a => {
    let sum = 0
    return () => {
        sum += -(a) * Math.log(Math.random())
        let res = parseInt(sum)
        sum = sum % 1
        return res
    }
}

const setInputNam = inputNam => {
    const delay = +document.getElementById('delay').value
    if (delay) {
        document.getElementById('input-num').style.backgroundColor = '#6492ff'
        setTimeout(() => document.getElementById('input-num').style.backgroundColor = '#ff6464', delay / 3)
    }

    document.getElementById('input-num').value = inputNam
}
const getK1 = () => +document.getElementById('K1').value
const getK2 = () => +document.getElementById('K2').value
const getK3 = () => +document.getElementById('K3').value
const setK1 = item => {
    document.getElementById('K1').value = item
}
const setK2 = item => {
    document.getElementById('K2').value = item
}
const setK3 = item => {
    document.getElementById('K3').value = item
}
const getNot = () => +document.getElementById('NOT').value
const addNot = item => {
    document.getElementById('NOT').value = +document.getElementById('NOT').value + item
}
const addRes = item => {
    document.getElementById('res').value = +document.getElementById('res').value + item
}
const addLIST_1_now = sum => {
    if (sum > 0) {
        document.getElementById('LIST_1_now').value = +document.getElementById('LIST_1_now').value + sum
    }
}
const getList1 = () => +document.getElementById('LIST_1_all').value
const setList1 = item => {
    addLIST_1_now(item - getList1())
    document.getElementById('LIST_1_all').value = item
}
const addLIST_2_now = sum => {
    if (sum > 0) {
        document.getElementById('LIST_2_now').value = +document.getElementById('LIST_2_now').value + sum
    }
}
const getList2 = () => +document.getElementById('LIST_2_all').value
const setList2 = item => {
    addLIST_2_now(item - getList2())
    document.getElementById('LIST_2_all').value = item
}



document.getElementById('calc').onclick = () => {
    const getInputNam = genExpDist(+document.getElementById('A').value)
    let getMaxProcessK1 = genExpDist(+document.getElementById('N1').value)
    let getMaxProcessK2 = genExpDist(+document.getElementById('N2').value)
    let getMaxProcessK3 = genExpDist(+document.getElementById('N2').value)

    let isBlock = false;

    const processK1 = inputNam => {
        const allNum = getList1() + inputNam + getK1()
        let maxProcess = getMaxProcessK1()

        if (isBlock) {
            setList1(getList1() + inputNam)
            return 0
        }

        if (allNum === 0) {
            // зупинка обробки K
            getMaxProcessK1 = genExpDist(+document.getElementById('N1').value)
            maxProcess = 0
        }

        if (allNum <= maxProcess) {
            setList1(0)
            setK1(0)
            return allNum
        }

        setK1(1)
        setList1(allNum - maxProcess - 1)
        return maxProcess
    }


    const processList2 = (nums) => {
        const L = +document.getElementById('L').value
        if (nums <= L) {
            setList2(nums)
            return true
        }

        setList2(L)
        isBlock = true
        addNot(nums - L)
        setK1(getK1() + nums - L)
        return false
    }


    const processK2_3 = inputNam => {
        const allNums = getList2() + inputNam + getK2() + getK3()
        let k2 = getMaxProcessK2()
        let k3 = getMaxProcessK3()
        if (allNums === 0) {
            // зупинка обробки K
            getMaxProcessK2 = genExpDist(+document.getElementById('N2').value)
            getMaxProcessK3 = genExpDist(+document.getElementById('N2').value)
            k2 = 0
            k3 = 0
        }

        const maxProcess = k2 + k3

        if (allNums <= maxProcess) {
            setList2(0)
            setK2(0)
            setK3(0)
            addRes(allNums)
            isBlock = false
            return true
        }

        if (allNums - maxProcess === 1) {
            setK2(1)
            setK3(0)
            addRes(maxProcess)
            isBlock = false
            return true
        }

        setK2(1)
        setK3(1)
        addRes(maxProcess)
        return processList2(allNums - maxProcess - 2)
    }


    const mainProcess = inputNam => {
        setInputNam(inputNam)
        processK2_3(processK1(inputNam))
    }

    const runProcess = (inputNam, i) => {
        const delay = +document.getElementById('delay').value
        if (delay) {
            setTimeout(
                () => {
                    mainProcess(inputNam)
                }, delay * i
            )
        } else {
            mainProcess(inputNam)
        }
    }




    Array(+document.getElementById('time-limit').value)
        .fill(0)
        .map(getInputNam)
        .map(runProcess)
}