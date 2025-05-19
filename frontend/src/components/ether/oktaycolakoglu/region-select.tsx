"use client"

import { regions } from "@/lib/oktaycolakoglu/"
import { SelectProps } from "@radix-ui/react-select"
import ReactCountryFlag from "react-country-flag"

import { getCountryName } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ether/oktaycolakoglu/ui/select"
import { useToast } from "@/components/ether/oktaycolakoglu/ui/use-toast"
import { setRegion } from "@/action/oktaycolakoglu"

export const RegionSelect: React.FC<SelectProps> = ({
  onValueChange,
  ...props
}) => {
  const { toast } = useToast()

  const handleChange = (value: string) => {
    setRegion(value)
    onValueChange?.(value)

    setTimeout(() => {
      toast({
        title: "Region changed successfully",
        description: `You have successfully changed your region to ${getCountryName(
          value
        )}`,
      })
    }, 500)
  }

  return (
    <Select onValueChange={handleChange} {...props}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region.iso_3166_1} value={region.iso_3166_1}>
            <div className="flex items-center gap-2">
              <ReactCountryFlag countryCode={region.iso_3166_1} svg />
              {region.english_name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
