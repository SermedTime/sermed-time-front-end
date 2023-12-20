import { IProduct } from 'hooks/Services/Management/Products/useSearch'

export function getProposalTotalValue(materialsAdded: IProduct[]) {
  let proposalTotalValue = 0
  materialsAdded.forEach(element => {
    proposalTotalValue += element.productPrice * element.productQuantity
  })

  return proposalTotalValue
}

export function getProposalTotalWeight(materialsAdded: IProduct[]) {
  let proposalTotalWeight = 0
  materialsAdded.forEach(element => {
    proposalTotalWeight += element.productQuantity
  })

  return proposalTotalWeight
}

export function getDuplicateDate(
  numberOfPayments = 0,
  startingDate: Date = new Date()
) {
  startingDate.setMonth(startingDate.getMonth() + numberOfPayments)
  return startingDate
}

export function getProductPriceWithDiscount(
  productPrice: number,
  productDiscount: number
) {
  return productPrice - productPrice * (productDiscount / 100)
}
