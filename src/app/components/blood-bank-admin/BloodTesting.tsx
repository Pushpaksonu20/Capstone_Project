import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner";

export const BloodTesting: React.FC = () => {
  const [donationId, setDonationId] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">(
    "",
  );
  const [haemoglobin, setHaemoglobin] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hb = Number(haemoglobin);
    const sys = Number(systolicBP);
    const dia = Number(diastolicBP);

    const hbEligible =
      (gender === "male" && hb >= 13.0) ||
      (gender === "female" && hb >= 12.5);

    const bpEligible =
      sys >= 90 && sys <= 180 && dia >= 50 && dia <= 100;

    if (hbEligible && bpEligible) {
      toast.success(
        "Donor is ELIGIBLE. Blood approved for donation.",
      );
    } else {
      toast.error(
        "Donor is NOT ELIGIBLE. Blood donation rejected.",
      );
    }

    setDonationId("");
    setGender("");
    setHaemoglobin("");
    setSystolicBP("");
    setDiastolicBP("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Blood Eligibility Testing
        </h1>
        <p className="text-gray-600 mt-1">
          Haemoglobin & Blood Pressure Screening
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Medical Test Entry</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation ID */}
              <div className="space-y-2">
                <Label>Donation ID</Label>
                <Input
                  value={donationId}
                  onChange={(e) =>
                    setDonationId(e.target.value)
                  }
                  required
                />
              </div>

              {/* Gender */}
              <div className="space-y-3">
                <Label>Gender</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={(v) =>
                    setGender(v as "male" | "female")
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label
                      htmlFor="male"
                      className="font-normal"
                    >
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="female"
                      id="female"
                    />
                    <Label
                      htmlFor="female"
                      className="font-normal"
                    >
                      Female
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Haemoglobin */}
              <div className="space-y-2">
                <Label>Haemoglobin (g/dL)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={haemoglobin}
                  onChange={(e) =>
                    setHaemoglobin(e.target.value)
                  }
                  required
                />
              </div>

              {/* Blood Pressure */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Systolic BP (mmHg)</Label>
                  <Input
                    type="number"
                    value={systolicBP}
                    onChange={(e) =>
                      setSystolicBP(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Diastolic BP (mmHg)</Label>
                  <Input
                    type="number"
                    value={diastolicBP}
                    onChange={(e) =>
                      setDiastolicBP(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Evaluate Eligibility
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Eligibility Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Eligibility Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900">
                Eligible Donor
              </h3>
              <p className="text-sm text-green-700">
                ✓ Hb ≥ 13.0 (Male)
                <br />
                ✓ Hb ≥ 12.5 (Female)
                <br />✓ BP between 90/50 and 180/100
              </p>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-900">
                Not Eligible
              </h3>
              <p className="text-sm text-red-700">
                ✗ Low haemoglobin
                <br />✗ Abnormal blood pressure
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};