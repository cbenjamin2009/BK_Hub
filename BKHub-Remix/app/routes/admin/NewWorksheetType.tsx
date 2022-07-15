import * as React from "react";
import { Form, json, redirect, useActionData } from "remix";
import type { ActionFunction } from "remix";

import { createWorksheet } from "~/models/worksheet.server";
import { requireUserId } from "~/session.server";