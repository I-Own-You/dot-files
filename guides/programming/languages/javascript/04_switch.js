let discount

function whichMemberStatusDoYouHave(memberStatus) {
  switch (memberStatus) {
    case 'vip':
      {
        const a = 2 // if you want to define a variable here, you need scope block so {}
      }
      discount = 0.25
      break // if you dont put break statement or return
    //  then all cases down below will run untill break is achieved or switch ended
    case 'diamond':
      discount = 0.2
      break
    case 'gol': //you can tie 2 cases,
    //  so if case is 'gol' the 'silve' case will run also
    case 'silve':
      discount = 0.1
      break
    default:
      discount = 0
      break
  }
}

whichMemberStatusDoYouHave('gol')
